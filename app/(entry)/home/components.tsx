import { HText } from "@/components/HyperText";
import { FlexCol } from "@/components/ui/FlexCol";
import { FlexRow } from "@/components/ui/FlexRow";
import { Feather, Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import {
  Image,
  Platform,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

export const Header = () => {
  return (
    <FlexRow className={clsx(`justify-between px-5 bg-transparent z-10 `)}>
      <FlexRow>
        <TouchableOpacity className="size-10 mr-2.5 rounded-full bg-active flex items-center justify-center">
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
            className="size-9 rounded-full relative z-[50]"
          />
        </TouchableOpacity>
        <FlexCol className="justify-start">
          <HText className="" weight="bold">
            Welcome!
          </HText>
          <HText variant="tiny" color="secondary">
            PRO
          </HText>
        </FlexCol>
      </FlexRow>
      <TouchableOpacity className="hidden">
        <Ionicons name="notifications-outline" size={24} color="#333" />
      </TouchableOpacity>
    </FlexRow>
  );
};

export const SearchBar = () => {
  return (
    <View className="px-4 pt-2 items-center bg-transparent z-10">
      <FlexRow className="ps-5 pe-2 justify-between border-[0.33px] border-gray-500 h-14 rounded-full bg-white">
        <TextInput
          placeholder="Search"
          placeholderTextColor="#94A3B8"
          className="flex-1 h-12 font-space font-semibold text-active"
        />
        <TouchableOpacity className="size-10 rounded-full items-center justify-center">
          <Feather name="search" size={20} color="#ccc" />
        </TouchableOpacity>
      </FlexRow>
    </View>
  );
};
