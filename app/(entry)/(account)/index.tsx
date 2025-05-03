"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { Icon } from "@/app/_components/icons";
import { useAuth } from "@/app/_ctx/auth";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import clsx from "clsx";

const { width } = Dimensions.get("window");
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
  const toggleMode = useCallback(() => {
    toggleColorScheme();
  }, [toggleColorScheme]);

  const navigateToPremium = () => {
    router.push("/premium");
  };

  return (
    <View className="flex-1 bg-white dark:bg-void">
      <Animated.View
        className="dark:border-neutral-800"
        style={[styles.header, headerAnimatedStyle]}
      >
        <LinearGradient
          colors={isDarkMode ? ["#14141B", "#14141B"] : ["#fafafa", "#fafafa"]}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            className="absolute top-16 z-10 left-8 size-10 rounded-full bg-grei dark:bg-gray-300 flex flex-row items-center justify-center"
            onPress={goBack}
          >
            <Icon
              name="arrow-to-left"
              size={24}
              color="#14141b"
              container="text-void -rotate-90"
            />
          </TouchableOpacity>

          <TouchableOpacity className="hidden" style={styles.settingsButton}>
            <Feather name="settings" size={22} color="#fff" />
          </TouchableOpacity>
          <Animated.View
            className="mt-12 size-28 rounded-full border-4 dark:border-off-active/30 border-hyper-active/20 shadow-hyper-active shadow-2xl"
            style={[avatarAnimatedStyle]}
          >
            <Image source={{ uri: userInfo?.avatar }} style={styles.avatar} />
            <View className="absolute bottom-1 -right-2 size-8 flex overflow-hidden rounded-full flex-row items-center justify-center border-chalk border-3 bg-void/60">
              <Icon name="pen-bold-duotone" size={16} color="#fafafa" solid />
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
        contentContainerStyle={styles.scrollContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View style={{ height: HEADER_HEIGHT }} />

        {/* Account Stats */}
        <Animated.View
          entering={FadeInDown.duration(300)}
          style={styles.statsContainer}
          className="hidden"
        >
          {/*
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
            */}
          <BlurView
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
        </Animated.View>

        {/* Account Settings */}
        <Animated.View
          entering={FadeInDown.duration(300)}
          className="py-12 px-6"
        >
          <Text className="h-14 font-ultratight tracking-tighter dark:text-chalk text-2xl">
            Account Settings
          </Text>

          <View className="bg-neutral-50 dark:bg-neutral-300 py-1 rounded-3xl">
            <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4">
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon name="user-settings" size={24} color="#0F172A" />
                </View>
                <Text className="font-quicksemi text-lg opacity-80 tracking-tight">
                  Personal Information
                </Text>
              </View>
              <Icon name="chev-right-linear" size={24} color="#0F172A" />
            </TouchableOpacity>

            <Separator />

            <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga">
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon name="chats" size={24} color="#14141b" />
                </View>
                <Text className="font-quicksemi opacity-80 text-lg tracking-tight">
                  Transactions
                </Text>
              </View>
              <Icon name="chev-right-linear" size={24} color="#14141b" />
            </TouchableOpacity>

            <Separator />

            <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga">
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon name="wallet" size={24} color="#14141b" />
                </View>
                <Text className="font-quicksemi opacity-80 text-lg tracking-tight">
                  Rewards
                </Text>
              </View>
              <Icon name="chev-right-linear" size={24} color="#14141b" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Preferences */}
        <Animated.View
          entering={FadeInDown.duration(300)}
          className="py-6 px-6"
        >
          <Text className=" font-ultratight h-14 tracking-tight dark:text-chalk text-2xl">
            Preferences
          </Text>

          <View className="bg-neutral-50 rounded-3xl dark:bg-neutral-400 py-1">
            <TouchableOpacity
              onPress={toggleMode}
              className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga"
            >
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon name="paint-brush" size={24} color="#0F172A" />
                </View>
                <Text className="font-quicksemi text-lg dark:text-black tracking-tight">
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </Text>
              </View>
              <Icon
                name={isDarkMode ? "toggle-on" : "toggle-off"}
                size={24}
                color="#0F172A"
              />
            </TouchableOpacity>

            <Separator />

            <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga">
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon name="notification-square" size={24} color="#020202" />
                </View>
                <Text className="font-quicksemi text-lg dark:text-black tracking-tight">
                  Notifications
                </Text>
              </View>
              <Icon name="chev-right-linear" size={24} color="#0F172A" />
            </TouchableOpacity>

            <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga">
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon name="fingerprint" size={24} color="#020202" />
                </View>
                <Text className="font-quicksemi text-lg dark:text-black tracking-tight">
                  Passkeys
                </Text>
              </View>
              <Icon name="chev-right-linear" size={24} color="#14141b" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Premium Card */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(700)}
          style={styles.section}
        >
          <LinearGradient
            colors={
              isDarkMode
                ? ["#020202", "#030303"]
                : [
                    "#53A9FF",
                    "#53A9FF",
                    "#53A9FF",
                    "#53A9FF",
                    "#aad3fc",
                    "#172554",
                  ]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.premiumCard}
          >
            <View style={styles.premiumContent} className="relative">
              <View className="gap-y-1">
                <Text className="font-ultratight text-chalk text-[20px] leading-none">
                  Upgrade to Premium
                </Text>
                <Text className="text-white/90 dark:text-neutral-400 font-quick max-w-[80%] ">
                  Get exclusive benefits and premium features
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.65}
                onPress={navigateToPremium}
                className={clsx(
                  "rounded-full absolute shadow-gray-500 top-5 right-5 px-2.5 pb-1 border-4",
                  "flex flex-row items-center justify-center",
                  "border-off-active/40 bg-white",
                  "dark:bg-transparent dark:border-white/50",
                )}
              >
                <Text className="font-quickbold text-hyper-active dark:text-ultra-active text-lg tracking-tight">
                  Upgrade
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Support */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(700)}
          className="py-12 px-6"
        >
          <Text className=" font-ultratight dark:text-chalk h-14 text-2xl">
            Support
          </Text>
          <View className="bg-neutral-50 dark:bg-neutral-500 rounded-3xl py-1">
            <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga">
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon name="document-linear" size={24} color="#14141b" />
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

            <Separator />

            <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga">
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon name="chats" size={24} color="#14141b" />
                </View>
                <Text className="font-quicksemi text-lg tracking-tighter">
                  Contact Support
                </Text>
              </View>
              <Icon name="chev-right-linear" size={24} color="#14141b" />
            </TouchableOpacity>

            <Separator />

            <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga">
              <View className="flex flex-row items-center gap-x-4">
                <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                  <Icon name="wallet" size={24} color="#14141b" />
                </View>
                <Text className="font-quicksemi text-lg tracking-tighter">
                  FastInsure Guide
                </Text>
              </View>
              <Icon name="chev-right-linear" size={24} color="#14141b" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
};

export const Separator = () => (
  <View className="h-px bg-neutral-300 dark:bg-neutral-400/60" />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    overflow: "hidden",
  },
  headerGradient: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  settingsButton: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  avatarContainer: {
    marginTop: 30,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: {
    alignItems: "center",
    marginTop: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  scrollContent: {
    paddingBottom: 30,
  },
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
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 16,
  },
  settingCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 5,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  settingText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#334155",
  },
  settingDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginHorizontal: 15,
  },
  premiumCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  premiumContent: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  premiumTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  premiumDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    maxWidth: "80%",
  },
  premiumButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  premiumButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6366F1",
  },
});

export default ProfileScreen;
