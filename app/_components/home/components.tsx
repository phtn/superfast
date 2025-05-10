import { FlexCol } from "@/components/ui/FlexCol";
import { FlexRow } from "@/components/ui/FlexRow";
import { useAuth } from "@/app/_ctx/auth";
import { Feather } from "@expo/vector-icons";
import { Image, TouchableOpacity, View, TextInput, Text } from "react-native";
import { useRouter } from "expo-router";
import { Icon } from "../icons";
import { Colors } from "@/constants/Colors";

export const Header = () => {
  const { user } = useAuth();
  const router = useRouter();
  const navigateToProfile = () => {
    router.push("/(entry)/(account)");
  };

  return (
    <View className={`justify-between h-16 flex flex-row px-5 z-10`}>
      <FlexCol className="items-start justify-center">
        <TouchableOpacity
          activeOpacity={0.65}
          onPress={navigateToProfile}
          className="items-start flex-col flex"
        >
          <View className="w-full flex items-center flex-row">
            <Image
              source={{
                uri: user?.user_metadata?.avatar_url,
              }}
              className="border-2 border-ga mr-3"
              style={{ width: 32, height: 32, borderRadius: 16 }}
            />
            <Text className="dark:text-chalk font-tight">
              {user?.user_metadata?.name?.split(" ").shift()}
            </Text>
            <View className="size-6 pt-0.5">
              <Icon
                size={24}
                name="chev-right-broken"
                color={Colors.dark.ultra}
              />
            </View>
          </View>
        </TouchableOpacity>
      </FlexCol>
      <FlexRow>
        <Text className="font-courg text-dark-active mt-0.5 tracking-tighter text-lg dark:text-hyper-active">
          My
        </Text>
        <Text className="font-quickbold text-royal -tracking-widest text-lg dark:text-chalk">
          FastInsure
        </Text>
      </FlexRow>
    </View>
  );
};

export const SearchBar = () => {
  return (
    <View className="px-4 pt-1 items-center z-10">
      <FlexRow className="ps-5 pe-2 justify-between h-14 rounded-2xl bg-grei/80 dark:bg-neutral-200">
        <TextInput
          placeholder="Search"
          placeholderTextColor="#919195"
          className="flex-1 h-12 font-quicksemi shadow-none border-none text-void"
        />
        <TouchableOpacity className="size-10 rounded-full items-center opacity-60 justify-center">
          <Feather name="search" size={20} color="#919195" />
        </TouchableOpacity>
      </FlexRow>
    </View>
  );
};
