"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Icon } from "@/app/_components/icons";
import { useAuth } from "@/app/_ctx/auth";
import { RelativePathString, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";
import { PremiumCard } from "@/app/_components/cards/premium";

const HEADER_HEIGHT = 280;

interface UserInfo {
  id: string | null;
  name: string | null;
  email: string | undefined;
  avatar: string | undefined;
}

const ProfileScreen = ({ navigation }: any) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [faceID, setFaceID] = useState(true);
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (user) {
      setUserInfo({
        id: user.id,
        name: user.user_metadata.name,
        email: user.email,
        avatar: user.user_metadata.avatar_url,
      });
    }
  }, [user]);

  const router = useRouter();
  const goBack = useCallback(() => router.back(), [router]);
  const route = useCallback(
    (path: RelativePathString) => () => {
      router.navigate(path);
    },
    [router],
  );

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, HEADER_HEIGHT],
        [HEADER_HEIGHT, 110],
        "clamp",
      ),
      opacity: interpolate(
        scrollY.value,
        [HEADER_HEIGHT - 100, HEADER_HEIGHT],
        [1, 0],
        "clamp",
      ),
    };
  });

  const avatarAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT - 20],
            [1, 0.8],
            "clamp",
          ),
        },
        {
          translateY: interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT - 100],
            [0, -6],
            "clamp",
          ),
        },
      ],
    };
  });

  const nameAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT - 100],
            [0, -20],
            "clamp",
          ),
        },
      ],
      opacity: interpolate(
        scrollY.value,
        [HEADER_HEIGHT - 130, HEADER_HEIGHT - 100],
        [1, 0],
        "clamp",
      ),
    };
  });

  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDarkMode = useMemo(() => colorScheme === "dark", [colorScheme]);
  const navigateToPremium = () => {
    router.push("/premium");
  };

  return (
    <View className="flex-1 bg-white dark:bg-void">
      <Animated.View
        className="dark:border-neutral-800 w-full absolute top-0 left-0 z-10 overflow-hidden"
        style={[{ height: HEADER_HEIGHT }, headerAnimatedStyle]}
      >
        <LinearGradient
          colors={isDarkMode ? ["#14141B", "#14141B"] : ["#fafafa", "#fafafa"]}
          className="flex-1 items-center pt-12"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            className="absolute top-16 z-10 left-8 size-10 rounded-full flex flex-row items-center justify-center"
            onPress={goBack}
          >
            <Icon
              size={28}
              name="arrow-to-left"
              container="-rotate-90"
              color={isDarkMode ? Colors.dark.text : Colors.dark.royal}
            />
          </TouchableOpacity>

          <Animated.View
            className="mt-12 size-28 rounded-full border-4 dark:border-off-active/30 border-hyper-active/20 shadow-hyper-active shadow-2xl"
            style={[avatarAnimatedStyle]}
          >
            <Image
              source={{ uri: userInfo?.avatar }}
              className="size-full rounded-full"
            />
            <View className="absolute bottom-1 -right-2 size-8 flex overflow-hidden rounded-full flex-row items-center justify-center border-chalk border-3 bg-void/60">
              <Icon name="pen-bold-duotone" color="#fafafa" solid />
            </View>
          </Animated.View>
          <Animated.View
            className="flex flex-row items-center mt-6"
            style={[nameAnimatedStyle]}
          >
            <Text className="font-space dark:text-chalk text-void text-xl mb-2">
              {userInfo?.name}
            </Text>
            {/* <Text style={styles.profileEmail}>{user?.email}</Text> */}
          </Animated.View>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View style={{ height: HEADER_HEIGHT }} />

        {/* Account Settings */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(300)}
          className="py-12 px-0"
        >
          <Text className="h-14 font-ultratight px-6 tracking-tighter dark:text-chalk text-2xl">
            Settings
          </Text>

          <View className="bg-neutral-50 dark:bg-hades py-1 rounded-3xl">
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={route("profile" as RelativePathString)}
              className="flex flex-row items-center justify-between px-4 py-4"
            >
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon
                    size={24}
                    name="user-settings"
                    color={isDarkMode ? Colors.dark.text : Colors.light.text}
                  />
                </View>
                <Title
                  label="Personal Info"
                  subtext="Display name &middot; Phone number"
                />
              </View>
              <Icon name="chev-right-linear" color={Colors.dark.active} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              className="flex h-[4.5rem] flex-row items-center justify-between px-4 py-4 border-y-[0.33px] border-neutral-300 dark:border-medusa"
            >
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon name="chats" size={24} color={Colors.dark.fade} />
                </View>
                <Text className="font-quicksemi opacity-50 text-lg dark:text-chalk tracking-tight">
                  Transactions
                </Text>
              </View>
              <View className="-rotate-45">
                <Icon name="plus" color={Colors.dark.fade} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              className="flex flex-row items-center justify-between px-4 py-4"
            >
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon name="wallet" size={24} color={Colors.dark.fade} />
                </View>
                <Text className="font-quicksemi dark:text-mortar text-lg tracking-tight">
                  Rewards
                </Text>
              </View>
              <View className="-rotate-45">
                <Icon name="plus" color={Colors.dark.fade} />
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Preferences */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(300)}
          className="py-6 px-0"
        >
          <Text className=" font-ultratight h-14 px-8 tracking-tighter dark:text-chalk text-2xl">
            Preferences
          </Text>

          <View className="bg-neutral-50 rounded-3xl dark:bg-hades py-1">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={toggleColorScheme}
              className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga"
            >
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon
                    name="paint-brush"
                    size={24}
                    color={isDarkMode ? Colors.dark.text : Colors.light.text}
                  />
                </View>
                <Text className="font-quickbold text-lg dark:text-chalk tracking-tight">
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </Text>
              </View>
              <Icon
                name={isDarkMode ? "fat-toggle-off" : "fat-toggle-on"}
                size={40}
                solid
                fill={Colors.dark.fade}
                color={isDarkMode ? Colors.dark.fade : Colors.dark.active}
              />
            </TouchableOpacity>

            <TouchableOpacity className="flex h-[4.5rem] flex-row items-center justify-between px-4 py-4 border-y-[0.33px] border-neutral-300 dark:border-neutral-400/80">
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon
                    size={24}
                    name="notification-square"
                    color={isDarkMode ? Colors.dark.text : Colors.light.text}
                  />
                </View>
                <Title
                  label="Notifications"
                  subtext="Enabled &middot; Do not disturb is off"
                />
                <Text className="font-quicksemi text-lg dark:text-black tracking-tight"></Text>
              </View>
              <Icon name="chev-right-linear" color={Colors.light.text} />
            </TouchableOpacity>

            <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga">
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon
                    name="fingerprint"
                    size={24}
                    color={isDarkMode ? Colors.dark.text : Colors.light.text}
                  />
                </View>
                <Title label="Passkeys" subtext="Create a new passkey" />
              </View>
              <Icon name="chev-right-linear" color={Colors.light.text} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Premium Card */}
        <PremiumCard title="Upgrade to Premium" onPress={navigateToPremium} />

        {/* Support */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(300)}
          className="py-12 px-6"
        >
          <Text className=" font-ultratight dark:text-chalk h-14 text-2xl">
            Support
          </Text>
          <View className="bg-neutral-50 dark:bg-neutral-300 rounded-3xl py-1">
            <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga">
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon
                    name="document-linear"
                    size={24}
                    color={Colors.light.text}
                  />
                </View>
                <Text className="font-quicksemi text-lg tracking-tighter">
                  Help Center
                </Text>
              </View>
              <Icon
                name="chev-right-linear"
                strokeWidth={1.5}
                size={24}
                color="#14141b"
              />
            </TouchableOpacity>

            <TouchableOpacity className="flex h-[4.5rem] flex-row items-center justify-between px-4 py-4 border-y-[0.33px] border-neutral-300 dark:border-neutral-400/80">
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon name="chats" size={24} color={Colors.light.text} />
                </View>
                <Text className="font-quicksemi text-lg tracking-tighter">
                  Contact Support
                </Text>
              </View>
              <Icon name="chev-right-linear" color={Colors.light.text} />
            </TouchableOpacity>

            <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga">
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon name="wallet" size={24} color={Colors.light.text} />
                </View>
                <Text className="font-quicksemi text-lg tracking-tighter">
                  FastInsure Guide
                </Text>
              </View>
              <Icon name="chev-right-linear" color={Colors.light.text} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
};

export const Separator = () => (
  <View className="h-px bg-neutral-200 dark:bg-neutral-400/60" />
);

interface TitleProps {
  label: string;
  subtext?: string;
  description?: string;
}
const Title = ({ label, subtext }: TitleProps) => {
  return (
    <View>
      <Text className="font-quickbold text-lg tracking-tight dark:text-chalk">
        {label}
      </Text>
      <Text className="text-sm font-quick tracking-tighter opacity-70 dark:text-chalk">
        {subtext}
      </Text>
    </View>
  );
};

export default ProfileScreen;

{
  /* Account Stats

          statsContainer: {
              marginHorizontal: 20,
              marginTop: 80,
              borderRadius: 16,
              borderWidth: 1,
              overflow: "hidden",
            },
          */
}
{
  /* <Animated.View
          entering={FadeInDown.duration(300)}
          style={styles.statsContainer}
          className="hidden "
        > */
}
{
  /*
            statsContainer: {
               marginHorizontal: 20,
               marginTop: 80,
               borderRadius: 16,
               borderWidth: 1,
               overflow: "hidden",
             },
             statsBlur: {
               flexDirection: "row",
               justifyContent: "space-between",
               padding: 20,
               backgroundColor: "rgba(255, 255, 255, 0.8)",
             },
             statItem: {
               flex: 1,
               alignItems: "center",
             },
             statValue: {
               fontSize: 18,
               fontWeight: "700",
               color: "#0F172A",
               marginBottom: 4,
             },
             statLabel: {
               fontSize: 12,
               color: "#64748B",
             },
             statDivider: {
               width: 1,
               height: "100%",
               backgroundColor: "#E2E8F0",
             },
            */
}
{
  /* <BlurView
            intensity={Platform.OS === "ios" ? 60 : 100}
            tint="light"
            style={styles.statsBlur}
          >
            <View style={styles.statItem}>
              <Text style={styles.statValue}>€12,450</Text>
              <Text style={styles.statLabel}>Total Balance</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Transactions</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Active Cards</Text>
            </View>
          </BlurView>
        </Animated.View> */
}
