import { useAuth } from "@/ctx/auth";
import { SText } from "@/components/FontScaling";
import { FlexCol } from "@/components/ui/FlexCol";
import { FlexRow } from "@/components/ui/FlexRow";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "../icons";

export const Header = () => {
  const { user, displayName, loading } = useAuth();
  const router = useRouter();
  const navigateToProfile = useCallback(() => {
    router.navigate("/(entry)/(account)");
  }, [router]);

  return (
    <View className={`justify-between h-16 flex flex-row pt-1 px-5 z-10`}>
      <FlexCol className="items-start justify-center">
        <TouchableOpacity
          disabled={loading || !displayName}
          activeOpacity={0.65}
          onPress={navigateToProfile}
          className="items-start max-w-[95%] overflow-hidden flex-col flex"
        >
          <View className="w-full flex items-center flex-row">
            <Image
              source={{
                uri: user?.user_metadata?.avatar_url,
              }}
              className="border-2 border-ga mr-3"
              style={{ width: 32, height: 32, borderRadius: 16 }}
            />
            {loading ? (
              <ActivityIndicator color={Colors.dark.hyper} />
            ) : (
              <View className=" flex flex-row px-2 justify-start whitespace-nowrap overflow-hidden">
                <SText className="max-w-[80%] text-lg dark:text-chalk font-quicksemi whitespace-nowrap">
                  {displayName}
                </SText>
                <View className="size-6 pt-0.5">
                  <Icon
                    size={24}
                    name="chev-right-linear"
                    color={Colors.dark.ultra}
                  />
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </FlexCol>
      <FlexRow>
        <SText className="font-courg text-dark-active tracking-teen text-xl dark:text-hyper-active">
          My
        </SText>
        <SText className="font-quickbold text-royal -tracking-widest text-xl dark:text-chalk">
          FastInsure
        </SText>
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
