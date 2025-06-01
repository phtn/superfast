import { HyperList } from "@/components/HyperList";
import { Colors } from "@/constants/Colors";
import { DocType, useCTPLCtx } from "@/ctx/ctpl-ctx";
import { RelativePathString, useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { View } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { IconName } from "../../icons/types";
import { FlexCol } from "../FlexCol";
import { ListItem, SheetHeader } from "./components";

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
          id: "0",
          label: "Use Camera",
          subtext: "Take a photo of your document to upload.",
          icon: "camera-outline",
          onSelect: onCameraSelect,
        },
        {
          id: "1",
          label: "Browse Files",
          subtext: "Select a file from this device to upload.",
          icon: "folder",
          onSelect: onPickerSelect,
        },
      ] as IOption[],
    [onCameraSelect, onPickerSelect],
  );

  const OptItem = useCallback(
    (props: IOption) => (
      <ListItem {...props} fn={props.onSelect} isDark={isDark} />
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
          component={OptItem}
        />
      </View>
    </View>
  );
};

interface IOption {
  id: string;
  icon: IconName;
  label: string;
  subtext: string;
  description?: string;
  onSelect: () => Promise<void>;
}

export default UploadOptionSheet;
