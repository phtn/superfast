import { Text, TouchableOpacity, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { FlexRow } from "../FlexRow";
import { FlexCol } from "../FlexCol";
import { Ionicons } from "@expo/vector-icons";
import { Handle } from "./components";
import { Icon } from "@/components/icons";

function GetStartedSheet() {
  const handleUseCamera = () => {
    SheetManager.show("use-camera");
    console.log("Camera pressed");
  };

  return (
    <ActionSheet
      containerStyle={{ backgroundColor: "transparent", height: 320 }}
    >
      <View className="px-0" style={{ height: 360 }}>
        <FlexCol
          style={{ borderRadius: 24, height: "100%" }}
          className="justify-start relative bg-white border-t pt-4"
        >
          <Handle />
          <View className="h-14 pt-2 px-6">
            <Text
              className="text-sm tracking-widest font-quick"
              style={{ color: "#666" }}
            >
              ACTIONS
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleUseCamera}
            className="h-24 flex-row items-center px-8 justify-start gap-3"
          >
            <FlexRow className="size-14 rounded-2xl bg-grei">
              <Icon name="camera-outline" size={24} color="#14141B" />
            </FlexRow>
            <Text className="font-quicksemi w-2/3 tracking-tight text-lg px-2">
              Use camera
            </Text>
          </TouchableOpacity>
          {/* <View className="w-full bg-grei" style={{ height: 2 }} /> */}
          <TouchableOpacity className="h-24 flex-row items-center px-8 justify-start gap-3">
            <FlexRow className="size-14 rounded-2xl bg-grei">
              <Icon name="document-linear" size={24} color="#14141B" />
            </FlexRow>
            <Text className="font-quicksemi text-lg w-2/3 text-royal px-2">
              Enter vehicle details
            </Text>
          </TouchableOpacity>
        </FlexCol>
      </View>
    </ActionSheet>
  );
}

export default GetStartedSheet;
