"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type IconName } from "../_components/icons/types";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/lib/supabase";

export interface CarType {
  id: string;
  label: string;
  subtext?: string;
  description: string;
  keywords: string[];
  price: number;
  icon: IconName;
  imageUri: string;
}

interface CTPLCtxValues {
  carTypes: CarType[];
  onSelect: (id: string) => void;
  carType: CarType | undefined;
  pickImage: () => Promise<void>;
  image: string | null;
  documents: { or?: { uri: string; base64?: string }; cr?: { uri: string; base64?: string } };
  setDocuments: React.Dispatch<React.SetStateAction<{ or?: { uri: string; base64?: string }; cr?: { uri: string; base64?: string } }>>;
  /**
   * Upload a document to Supabase Storage and return its public URL
   */
  uploadDocument: (fileUri: string, fileName: string) => Promise<string>;
  /**
   * Submit all uploaded documents to the vehicle_documents table
   */
  submitDocuments: (userId: string) => Promise<void>;
}
export const CTPLCtx = createContext<CTPLCtxValues | undefined>(undefined);

export const CTPLCtxProvider = ({ children }: { children: ReactNode }) => {
  const [carType, setSelectedCarType] = useState<CarType>();
  const [documents, setDocuments] = useState<{ or?: { uri: string; base64?: string }; cr?: { uri: string; base64?: string } }>({});

  const carTypes = useMemo(
    () =>
      [
        {
          id: "private",
          label: "Private Cars",
          subtext: "Include jeeps and utility vehicles",
          description: "Private Cars",
          icon: "taxi",
          price: 600,
          keywords: [
            "jeepneys",
            "suv",
            "sedans",
            "utility vans",
            "family vans",
          ],
          imageUri:
            "https://firebasestorage.googleapis.com/v0/b/fastinsure-f1801.appspot.com/o/public%2Fbike.png?alt=media",
        },
        {
          id: "lm_trucks",
          label: "Light · Medium Trucks",
          description: "Trucks",
          subtext: "Not over 3,930 kilograms",
          icon: "tow-truck",
          price: 650,
          keywords: ["light trucks", "medium trucks", "elf trucks"],
          imageUri:
            "https://firebasestorage.googleapis.com/v0/b/fastinsure-f1801.appspot.com/o/public%2Flight_truck.png?alt=media",
        },
        {
          id: "hv_trucks",
          label: "Heavy Trucks",
          description: "Heavy Trucks",
          subtext: "Not over 3,930 kilograms",
          icon: "shipping-truck",

          price: 1245,
          keywords: ["heavy trucks", "private buses"],
          imageUri:
            "https://firebasestorage.googleapis.com/v0/b/fastinsure-f1801.appspot.com/o/public%2Fbike.png?alt=media",
        },
        {
          id: "motors",
          label: "Motorcycles · Tricycles · Trailers",
          description: "Motors",
          icon: "motorcycle",
          price: 600,
          keywords: ["motorcycles", "tricycles", "trailers"],
          imageUri:
            "https://firebasestorage.googleapis.com/v0/b/fastinsure-f1801.appspot.com/o/public%2Fbike.png?alt=media",
        },
      ] as CarType[],
    [],
  );

  const onSelect = useCallback(
    (id: string) => {
      const carType = carTypes.find((t) => t.id === id);
      setSelectedCarType(carType);
    },
    [carTypes],
  );

  const [image, setImage] = useState<string | null>(null);

  const pickImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }, []);

  // Upload a document to Supabase Storage and return its public URL
  const uploadDocument = useCallback(async (fileUri: string, fileName: string) => {
    const response = await fetch(fileUri);
    const blob = await response.blob();
    const { error } = await supabase.storage
      .from("documents")
      .upload(fileName, blob, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from("documents").getPublicUrl(fileName);
    return data.publicUrl;
  }, []);

  // Submit all uploaded documents to the vehicle_documents table
  const submitDocuments = useCallback(async (userId: string) => {
    if (!documents.or?.uri || !documents.cr?.uri) throw new Error("Both OR and CR documents are required");
    // Upload both documents
    const orUrl = await uploadDocument(documents.or.uri, `or_${userId}_${Date.now()}`);
    const crUrl = await uploadDocument(documents.cr.uri, `cr_${userId}_${Date.now()}`);
    // Insert into vehicle_documents table
    const { error } = await supabase.from("vehicle_documents").insert({
      user_id: userId,
      or_url: orUrl,
      cr_url: crUrl,
    });
    if (error) throw error;
  }, [documents, uploadDocument]);

  const value = useMemo(
    () => ({
      carTypes,
      onSelect,
      carType,
      pickImage,
      image,
      documents,
      setDocuments,
      uploadDocument,
      submitDocuments,
    }),
    [carTypes, onSelect, carType, pickImage, image, documents, setDocuments, uploadDocument, submitDocuments],
  );
  return <CTPLCtx.Provider value={value}>{children}</CTPLCtx.Provider>;
};

// Custom hook to use auth context
export function useCTPLCtx() {
  const context = useContext(CTPLCtx);
  if (context === undefined) {
    throw new Error("useCTPLCtx must be used within an CTPLCtx.Provider");
  }
  return context;
}
