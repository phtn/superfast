import { Text, TouchableOpacity, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { FlexRow } from "../FlexRow";
import { FlexCol } from "../FlexCol";
import { Ionicons } from "@expo/vector-icons";

function GetStartedSheet() {
  return (
    <ActionSheet
      containerStyle={{ backgroundColor: "transparent", height: 288 }}
    >
      <View className="h-72 px-8">
        <FlexCol
          className="justify-between bg-white py-2 h-56"
          style={{ borderRadius: 40 }}
        >
          <TouchableOpacity className="h-24 flex-row items-center px-10 justify-start gap-3">
            <FlexRow className="size-14 rounded-3xl bg-grei">
              <Ionicons name="camera" size={24} color="black" />
            </FlexRow>
            <Text className="font-quicksemi w-2/3 tracking-tighter text-lg px-2">
              Use camera
            </Text>
          </TouchableOpacity>
          <View className="h-1 w-full bg-grei" />
          <TouchableOpacity className="h-24 flex-row items-center px-10 justify-start gap-3">
            <FlexRow className="size-14 rounded-3xl bg-grei">
              <Ionicons name="document-text" size={20} color="black" />
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
