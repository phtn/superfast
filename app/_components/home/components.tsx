import { FlexCol } from "@/components/ui/FlexCol";
import { FlexRow } from "@/components/ui/FlexRow";
import { Feather } from "@expo/vector-icons";
import { clsx } from "clsx";
import { Image, TouchableOpacity, View, TextInput, Text } from "react-native";

interface HeaderProps {
  v?: number;
}

export const Header = ({ v }: HeaderProps) => {
  return (
    <FlexRow className={clsx(`justify-between px-5 bg-transparent z-10 `)}>
      <FlexRow>
        <TouchableOpacity className="size-10 mr-2.5 rounded-full bg-active flex items-center justify-center">
          <Image
            source={require("@/assets/images/profile.png")}
            className="size-9 rounded-full relative z-[50]"
          />
        </TouchableOpacity>
        <FlexCol className="justify-start">
          <Text className="tracking-tighter dark:text-chalk font-quickbold">
            René Descartes
          </Text>
        </FlexCol>
      </FlexRow>
      <FlexRow>
        <Text className="font-sat text-[15.5px] rotate-6 text-active mt-1 dark:text-dark-active">
          My
        </Text>
        <Text className="font-bold text-royal -tracking-widest dark:text-chalk text-[17px]">
          FastInsure
        </Text>
      </FlexRow>
    </FlexRow>
  );
};

export const SearchBar = () => {
  return (
    <View className="px-4 pt-2 items-center z-10">
      <FlexRow className="ps-5 pe-2 justify-between h-14 rounded-2xl bg-grei dark:bg-neutral-200">
        <TextInput
          placeholder="Search"
          placeholderTextColor="#888"
          className="flex-1 h-12 font-quicksemi placeholder:text-sm text-active"
        />
        <TouchableOpacity className="size-10 rounded-full items-center opacity-60 justify-center">
          <Feather name="search" size={20} color="#0F172A" />
        </TouchableOpacity>
      </FlexRow>
    </View>
  );
};
