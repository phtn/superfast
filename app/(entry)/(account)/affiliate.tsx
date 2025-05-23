import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { View, Alert, Text, Image, TouchableOpacity } from "react-native";
import { useAuth } from "@/ctx/auth";
import { FlexRow } from "@/components/ui/FlexRow";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Icon } from "@/components/icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";
import { useCodeConverter } from "@/hooks/useCodeConverter";
import { StatCard } from "@/components/cards/stats-card";
import { StatCardTwo } from "@/components/cards/stats-card-2";
import { useConfigCtx } from "@/ctx/config";

export default function Affiliate() {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [affiliateCode, setAffiliateCode] = useState("");

  const { session } = useAuth();
  const { uuidToCode } = useCodeConverter();
  const { getFileUri } = useConfigCtx();
  const re_up = useMemo(
    () => getFileUri("RE_UP_LOGO_DARK_MONO.png"),
    [getFileUri],
  );

  const { colorScheme } = useColorScheme();
  const isDarkMode = useMemo(() => colorScheme === "dark", [colorScheme]);
  const goBack = () => {
    router.back();
  };

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("user_profiles")
        .select(`id`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setId(data.id);
      }
      if (id) {
        setAffiliateCode(uuidToCode(id));
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [session?.user, uuidToCode, id]);

  useEffect(() => {
    if (session) {
      console.log(session.user.id);
      getProfile().catch(console.log);
    }
  }, [session, getProfile]);

  return (
    <View className="pt-16 pb-6 h-full bg-gray-200 dark:bg-transparent relative">
      <TouchableOpacity
        className="absolute top-16 z-10 left-6 size-10 rounded-full dark:bg-gray-300/5 flex flex-row items-center justify-center"
        onPress={goBack}
      >
        <Icon
          name="arrow-to-left"
          size={28}
          color={isDarkMode ? Colors.dark.text : Colors.dark.royal}
          container="-rotate-90"
        />
      </TouchableOpacity>
      <Animated.View
        entering={FadeInDown.delay(100).duration(300)}
        className="pt-12 px-6"
      >
        <FlexRow className="justify-between">
          <View>
            <Text className="h-8 font-space tracking-tighter dark:text-chalk text-2xl">
              {loading ? `·`.repeat(3) : affiliateCode}
            </Text>
            <Text className="text-sm font-quick dark:text-ultra-active">
              My Affiliate Code
            </Text>
          </View>
          <Image
            source={{ uri: session?.user.user_metadata.avatar_url }}
            className="size-16 rounded-full"
          />
        </FlexRow>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        scrollEventThrottle={16}
      >
        <Animated.View
          entering={FadeInDown.delay(100).duration(300)}
          className="py-12 gap-2 px-6"
        >
          <View className="gap-3 h-12 flex flex-row items-center justify-start">
            <Text className="font-ultratight tracking-tighter dark:text-chalk text-xl">
              Activity
            </Text>
            <Icon name="wave" color={Colors.dark.text} size={20} />
          </View>

          <View>
            <StatCard
              hours={0}
              percentChange={0.0}
              peakPercentage={0.0}
              chartData={[0, 0]}
            />
          </View>
          <View className="gap-3 h-12 flex flex-row items-center justify-start">
            <Text className="font-ultratight tracking-tighter dark:text-chalk text-xl">
              Revenue
            </Text>
            <Icon
              name="square-arrow-left-down-linear"
              color={Colors.dark.text}
              size={24}
            />
          </View>
          <View>
            <StatCardTwo
              // hours={4}
              companyName="re-up.ph"
              category="Software Development"
              revenue="P0.00"
              percentChange={0.0}
              engagement={0}
              // chartData={[0, 2]}
              logoUri={re_up}
            />
          </View>
        </Animated.View>
      </Animated.ScrollView>
      <View className="flex-1 flex"></View>
    </View>
  );
}
