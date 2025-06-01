import { StatCard } from "@/components/cards/stats-card";
import { StatCardTwo } from "@/components/cards/stats-card-2";
import { DText } from "@/components/FontScaling";
import { Icon } from "@/components/icons";
import { FlexRow } from "@/components/ui/FlexRow";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/ctx/auth";
import { useConfigCtx } from "@/ctx/config";
import { useCodeConverter } from "@/hooks/useCodeConverter";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Affiliate() {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [affiliateCode, setAffiliateCode] = useState("");

  const { session, avatar } = useAuth();
  const { uuidToCode } = useCodeConverter();
  const { getFileUri } = useConfigCtx();
  const re_up = useMemo(
    () => getFileUri("RE_UP_LOGO_DARK_MONO.png"),
    [getFileUri],
  );

  const { colorScheme } = useColorScheme();
  const isDark = useMemo(() => colorScheme === "dark", [colorScheme]);
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
      getProfile().catch(console.log);
    }
  }, [session, getProfile]);

  const showQrCode = useCallback(() => {
    SheetManager.show("qr-viewer", {
      payload: {
        isDark,
        affiliateCode,
      },
    });
  }, [isDark, affiliateCode]);

  return (
    <View className="pb-6 h-full bg-gray-200 dark:bg-transparent relative">
      <ScreenHeader
        back={goBack}
        title="FastInsure"
        label="Affiliate"
        isDark={isDark}
        safeTop
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        scrollEventThrottle={16}
      >
        <AffiliateCard
          loading={loading}
          code={affiliateCode}
          avatarUrl={avatar}
          isDark={isDark}
          showQrCode={showQrCode}
        />

        <Animated.View
          entering={FadeInDown.delay(100).duration(300)}
          className="py-12 gap-6 px-6"
        >
          <View>
            <View className="gap-3 h-12 flex flex-row items-center justify-start">
              <DText
                fontSize={12}
                className="font-ultratight tracking-tighter dark:text-chalk text-xl"
              >
                Activity
              </DText>
              <Icon
                size={20}
                name="wave"
                color={isDark ? Colors.dark.hyper : Colors.light.text}
              />
            </View>

            <View>
              <StatCard
                hours={0}
                percentChange={0.0}
                peakPercentage={0.0}
                chartData={[0, 0]}
              />
            </View>
          </View>
          <View>
            <FlexRow className="justify-between">
              <View className="gap-2 h-12 flex flex-row items-center justify-start">
                <DText
                  fontSize={12}
                  className="font-ultratight tracking-tighter dark:text-chalk text-xl"
                >
                  Revenue
                </DText>
                <Icon
                  name="square-arrow-left-down-linear"
                  color={isDark ? Colors.dark.hyper : Colors.light.text}
                  size={24}
                />
              </View>
              <TouchableOpacity className="dark:bg-ga/15 bg-ga/30 px-3 py-1.5 rounded-xl">
                <Icon name="fire" color={Colors.dark.text} />
              </TouchableOpacity>
            </FlexRow>
            <View>
              <StatCardTwo
                // hours={4}
                companyName="re-up.ph"
                category="Software Development"
                revenue={0}
                percentChange={0.0}
                engagement={0}
                // chartData={[0, 2]}
                logoUri={re_up}
              />
            </View>
          </View>
        </Animated.View>
      </Animated.ScrollView>
      <View className="flex-1 flex"></View>
    </View>
  );
}

interface AffiliateCardProps {
  loading: boolean;
  code: string | undefined;
  avatarUrl: string | undefined;
  isDark?: boolean;
  showQrCode: VoidFunction;
}
const AffiliateCard = ({
  loading,
  code,
  avatarUrl,
  showQrCode,
}: AffiliateCardProps) => (
  <View className="px-4">
    <Animated.View
      entering={FadeInDown.delay(100).duration(300)}
      className="p-6 bg-slate-800 h-64 rounded-2xl"
    >
      <FlexRow className="justify-between items-start h-1/4">
        <View className="">
          <DText
            fontSize={10}
            className="font-space uppercase tracking-tight text-off-active"
          >
            Active
          </DText>
          <DText fontSize={10} className="font-quick text-offwhite"></DText>
        </View>
        <Image source={{ uri: avatarUrl }} className="size-12 rounded-full" />
      </FlexRow>
      <Animated.View className="h-3/4 justify-end">
        <FlexRow className="h-1/2">
          <FlexRow className="h-0.5 bg-offwhite/10 w-full rounded-full justify-between">
            <Icon size={16} name="wave" color={Colors.dark.ga} />
            <View />
          </FlexRow>
        </FlexRow>
        <FlexRow className="h-1/2 justify-between items-end">
          <View className=" self-end">
            <View className="">
              <DText
                fontSize={14}
                className="font-spacebold uppercase tracking-widest text-offwhite"
              >
                {loading ? `·`.repeat(6) : code}
              </DText>
              <DText
                fontSize={9}
                className="font-quick text-offwhite opacity-75"
              >
                affiliate code
              </DText>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={showQrCode}
            className="flex flex-row items-center self-end ps-3 pe-2 bg-offwhite h-9 rounded-lg gap-1"
          >
            <DText
              fontSize={9}
              className="text-royal font-quicksemi tracking-snug"
            >
              View my
            </DText>
            <DText fontSize={10} className="text-royal font-spacebold">
              QR
            </DText>
            <Icon
              size={16}
              container="h-8"
              name="chev-right-linear"
              color={Colors.dark.royal}
            />
          </TouchableOpacity>
        </FlexRow>
      </Animated.View>
    </Animated.View>
  </View>
);
