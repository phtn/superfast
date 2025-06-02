"use client";

import { useCodeConverter } from "@/hooks/useCodeConverter";
import { supabase } from "@/lib/supabase";
import * as ImagePicker from "expo-image-picker";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { type IconName } from "../components/icons/types";
import { useAuth } from "./auth";
import { useConfigCtx } from "./config";
import { useColorScheme } from "nativewind";
import { IProductItem } from "@/components/home/products";

interface CarTypeDB {
  id: string;
  label: string;
  subtext?: string;
  description: string;
  keywords: string;
  price: number;
  icon: string;
  icon_solid?: boolean;
  image_filename: string;
}
export interface CarType {
  id: string;
  label: string;
  subtext?: string;
  description: string;
  keywords: string[];
  price?: number;
  icon: IconName;
  iconSolid?: boolean;
  imageUri: string;
}

interface Doc {
  uri: string;
  mimeType?: string;
}

interface VehicleDocs {
  or?: Doc;
  cr?: Doc;
  id?: Doc;
}

export type DocType = "or" | "cr" | "id";

interface PACtxValues {
  carTypes: CarType[] | null;
  onSelect: (id: string) => void;
  carType: CarType | undefined;
  pickImage: (docType: DocType) => Promise<void>;
  or_image: Doc | null;
  cr_image: Doc | null;
  id_image: Doc | null;
  documents: VehicleDocs;
  setDocuments: Dispatch<SetStateAction<VehicleDocs>>;
  sampleDocs: {
    or: string;
    cr: string;
    id: string;
  };
  /**
   * Upload a document to Supabase Storage and return its public URL
   */
  uploadDocument: (doc: Doc, fileName: string) => Promise<string | undefined>;
  /**
   * Submit all uploaded documents to the vehicle_documents table
   */
  submitDocuments: () => Promise<void>;
  uploading: boolean;
  products: IProductItem[];
}
const PACtx = createContext<PACtxValues | undefined>(undefined);

const BUCKET_NAME = "cars";
export const PACtxProvider = ({ children }: { children: ReactNode }) => {
  const [carType, setSelectedCarType] = useState<CarType>();
  const [documents, setDocuments] = useState<VehicleDocs>({});
  const [uploading, setUploading] = useState(false);
  const [carTypes, setCarTypes] = useState<CarType[] | null>(null);
  const { colorScheme } = useColorScheme();
  const isDark = useMemo(() => colorScheme === "dark", [colorScheme]);

  const { getFileUri } = useConfigCtx();
  const { user } = useAuth();
  const { gsec } = useCodeConverter();

  const paImageUri = useMemo(
    () => ({
      bg: getFileUri(isDark ? "CTPL_DARK.webp" : "CTPL_LIGHT4.png"),
      badge: getFileUri(isDark ? "CTPL_D.webp" : "CTPL_L.png"),
    }),
    [isDark, getFileUri],
  );

  const products = useMemo(
    () =>
      [
        {
          id: 0,
          name: "code: PA",
          subtext: "Personal Accident Insurance Coverage",
          image: paImageUri.bg,
          badge: paImageUri.badge,
          description: "",
          textStyles: "text-hades",
          tag: "personal accidents",
        },
      ] as IProductItem[],
    [paImageUri],
  );

  const getCarTypes = useCallback(async () => {
    const { data, error, status } = await supabase
      .from("car_types")
      .select(
        "id, label,subtext, description, icon, icon_solid, keywords, price, image_filename",
      );
    if (error) console.log(error, status);
    if (data) {
      const parsedCarTypes = data.map((t: CarTypeDB) => ({
        ...t,
        keywords: t.keywords.split(","),
        imageUri: getFileUri(t.image_filename),
        iconSolid: t.icon_solid,
      })) as CarType[];

      setCarTypes(parsedCarTypes);

      // console.log(JSON.stringify(data, null, 2));
      // console.log(status);
    }
  }, [getFileUri]);

  useEffect(() => {
    getCarTypes().catch(console.log);
  }, [getCarTypes]);

  const onSelect = useCallback(
    (id: string) => {
      const carType = carTypes?.find((t) => t.id === id);
      setSelectedCarType(carType);
    },
    [carTypes],
  );

  const [or_image, setORImage] = useState<Doc | null>(null);
  const [cr_image, setCRImage] = useState<Doc | null>(null);
  const [id_image, setIDImage] = useState<Doc | null>(null);

  const pickImage = useCallback(async (docType: DocType) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos", "livePhotos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const doc = {
      uri: result.assets?.[0].uri,
      mimeType: result.assets?.[0].mimeType,
    } as Doc;

    if (!result.canceled) {
      switch (docType) {
        case "or":
          return setORImage(doc);
        case "cr":
          return setCRImage(doc);
        case "id":
          return setIDImage(doc);
      }
    }
  }, []);

  // Upload a document to Supabase Storage and return its public URL
  const uploadDocument = useCallback(
    async (doc: Doc, fileName: string) => {
      try {
        // await ensureBucketExists();

        const fileExt = doc.uri.split(".").pop()?.toLowerCase();
        const filePath = `${user?.id}/${fileName}.${fileExt}`;

        console.log("Uploading to path:", filePath);
        const fileBody = await fetch(doc.uri).then((res) => res.arrayBuffer());

        const { error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(filePath, fileBody, {
            upsert: true,
            contentType: doc.mimeType,
          });

        if (error) {
          console.error("Upload error:", error);
          return undefined;
        }

        const { data: urlData, error: urlError } = await supabase.storage
          .from(BUCKET_NAME)
          .createSignedUrl(filePath, 36000);

        if (urlError) {
          console.error("Signed URL error:", urlError);
          return undefined;
        }

        return urlData?.signedUrl;
      } catch (err) {
        console.error("Error in uploadDocument:", err);
        return undefined;
      }
    },
    [user?.id],
  );

  // Submit all uploaded documents to the vehicle_documents table
  const submitDocuments = useCallback(async () => {
    if (!user) {
      console.error("No user found");
      setUploading(false);
      return;
    }
    const vid = await gsec();
    setUploading(true);
    try {
      let orUrl, crUrl;

      if (or_image) {
        console.log("Uploading OR image:", or_image);
        orUrl = await uploadDocument(or_image, `or_${vid.substring(0, 6)}`);
        console.log("OR_URL", orUrl);
      } else {
        console.log("No OR image to upload");
      }

      if (cr_image) {
        console.log("Uploading CR image:", cr_image);
        crUrl = await uploadDocument(cr_image, `cr_${vid.substring(0, 6)}`);
        console.log("CR_URL", crUrl);
      } else {
        console.log("No CR image to upload");
      }

      const vehicle = {
        vid,
        id: user.id,
        or_url: orUrl,
        cr_url: crUrl,
      };

      console.log("Inserting vehicle record:", vehicle);

      const { error } = await supabase.from("vehicle_docs").insert(vehicle);

      if (error) {
        console.error("Supabase insert error:", error);
      }
      console.log("Vehicle record inserted successfully");
    } catch (err) {
      console.error("Error in submitDocuments:", err);
    } finally {
      setUploading(false);
    }
  }, [user, cr_image, or_image, uploadDocument, gsec]);

  const sampleDocs = useMemo(
    () => ({
      cr: getFileUri("CR.png"),
      or: getFileUri("OR.png"),
      id: getFileUri("ID3.webp"),
    }),
    [getFileUri],
  );

  const value = useMemo(
    () => ({
      carTypes,
      onSelect,
      carType,
      pickImage,
      or_image,
      cr_image,
      id_image,
      documents,
      setDocuments,
      uploadDocument,
      submitDocuments,
      uploading,
      sampleDocs,
      products,
    }),
    [
      carTypes,
      onSelect,
      carType,
      pickImage,
      or_image,
      cr_image,
      id_image,
      documents,
      setDocuments,
      uploadDocument,
      submitDocuments,
      uploading,
      sampleDocs,
      products,
    ],
  );
  return <PACtx.Provider value={value}>{children}</PACtx.Provider>;
};

// Custom hook to use auth context
export function usePACtx() {
  const context = useContext(PACtx);
  if (context === undefined) {
    throw new Error("usePACtx must be used within an PACtx.Provider");
  }
  return context;
}
