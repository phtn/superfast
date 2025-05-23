import { Icon } from "@/components/icons";
import { DocType, useCTPLCtx } from "@/ctx/ctpl-ctx";
import { DText, SText } from "@/components/FontScaling";
import { HyperList } from "@/components/HyperList";
import { Colors } from "@/constants/Colors";
import clsx from "clsx";
import { RelativePathString, useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { FlexCol } from "../FlexCol";
import { SheetHeader } from "./components";
import { IconName } from "../../icons/types";

function UploadOptionSheet({ payload }: SheetProps<"upload-options">) {
  return (
    <ActionSheet
      indicatorStyle={{
        position: "absolute",
        top: -7,
        zIndex: 1,
        backgroundColor: payload.isDark
          ? Colors.dark.hyper
          : Colors.light.active,
      }}
      containerStyle={{
        paddingHorizontal: 0,
        paddingBottom: 0,
        overflow: "hidden",
        shadowOpacity: 0,
        shadowColor: "none",
        shadowOffset: { width: 0, height: 0 },
        elevation: 0,
        borderTopStartRadius: 36,
        borderTopEndRadius: 36,
        borderBottomStartRadius: 36,
        borderBottomEndRadius: 36,
        backgroundColor: "transparent",
      }}
      elevation={0}
      defaultOverlayOpacity={0.15}
      gestureEnabled
    >
      <View className="px-0">
        <FlexCol
          style={{ borderTopStartRadius: 24, borderTopEndRadius: 24 }}
          className="justify-start relative bg-white dark:bg-hades py-8"
        >
          <UploadOptions isDark={payload.isDark} docType={payload.docType} />
        </FlexCol>
      </View>
    </ActionSheet>
  );
}

interface UploadOptionsProps {
  isDark: boolean;
  docType: DocType;
}
const UploadOptions = ({ isDark, docType }: UploadOptionsProps) => {
  const { pickImage } = useCTPLCtx();

  const handleSelect = useCallback(async () => {
    await SheetManager.hide("upload-options");
  }, []);

  const router = useRouter();

  const onCameraSelect = useCallback(async () => {
    await handleSelect();
    router.navigate("/camera" as RelativePathString);
  }, [router, handleSelect]);

  const onPickerSelect = useCallback(async () => {
    await handleSelect();
    console.log(docType);
    pickImage(docType);
  }, [handleSelect, pickImage, docType]);

  const upload_options = useMemo(
    () =>
      [
        {
          id: 0,
          label: "Use camera",
          subtext: "Take a photo of your document to upload.",
          icon: "camera-outline",
          onSelect: onCameraSelect,
        },
        {
          id: 1,
          label: "Browse files",
          subtext: "Browse device files to select the document to upload.",
          icon: "folder",
          onSelect: onPickerSelect,
        },
      ] as IOption[],
    [onCameraSelect, onPickerSelect],
  );

  const OptionItem = useCallback(
    ({ id, label, subtext, icon, onSelect }: IOption) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onSelect}
        className={clsx(
          "flex flex-row items-center justify-between py-5 border-b border-grei dark:border-dark-ga/60",
          { "border-b-0": id === 1 },
        )}
      >
        <View className="flex flex-row items-center gap-x-4">
          <View className="size-10 rounded-xl flex flex-row items-center justify-center">
            <Icon
              size={24}
              name={icon}
              color={isDark ? Colors.dark.hyper : Colors.light.text}
            />
          </View>
          <View
            className={clsx("gap-y-0.5", {
              "flex flex-row items-center": !subtext,
            })}
          >
            <DText
              fontSize={12}
              className="font-quicksemi text-lg dark:text-grei tracking-snug"
            >
              {label}
            </DText>
            {subtext && (
              <SText className="text-sm font-tight dark:text-grei opacity-80">
                {subtext}
              </SText>
            )}
          </View>
        </View>
        <Icon
          name="chev-right-linear"
          color={isDark ? Colors.dark.hyper : Colors.light.text}
        />
      </TouchableOpacity>
    ),
    [isDark],
  );

  return (
    <View className="py-4 px-1.5">
      <SheetHeader title="Upload Options" />
      <View className="rounded-3xl py-6">
        <HyperList
          keyId="id"
          delay={500}
          data={upload_options}
          containerStyle={"h-[15rem]"}
          component={OptionItem}
        />
      </View>
    </View>
  );
};

interface IOption {
  id: number;
  icon: IconName;
  label: string;
  subtext: string;
  description?: string;
  onSelect: () => Promise<void>;
}

export default UploadOptionSheet;
