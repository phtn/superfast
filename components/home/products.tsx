import { DAnimatedText, DText, SText } from "@/components/FontScaling";
import { FlexRow } from "@/components/ui/FlexRow";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { clsx } from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import Animated, {
  FadeInDown,
  useAnimatedScrollHandler,
  useSharedValue,
  ZoomInEasyDown,
  ZoomInEasyUp,
} from "react-native-reanimated";
import { PremiumCard } from "../cards/premium-card";
import { Icon } from "../icons";
import { useRouter } from "expo-router";
import { ClassName } from "@/types";
import { POST } from "@/finance/ubp/get-access-token";

export interface IProductItem {
  id: number;
  name: string;
  price?: number;
  image?: string;
  badge?: string;
  description: string;
  rating?: number;
  subtext?: string;
  coverage?: string;
  textStyles?: string;
  tag?: string;
}

interface Props {
  isDark: boolean;
  list: IProductItem[];
}

export const Products = ({ isDark, list }: Props) => {
  const router = useRouter();
  const routeToDocs = useCallback(() => {
    router.navigate("/(entry)/(docs)");
  }, [router]);
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const renderItem = useCallback(
    ({ item }: { item: IProductItem }) => {
      return <ProductItem key={item.id} {...item} isDark={isDark} />;
    },
    [isDark],
  );

  const ProductHeader = useCallback(
    () => <ListHeader title="Car Insurance" />,
    [],
  );

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
    >
      <PremiumCard title="PRO Membership" onPress={routeToDocs} />
      <FlashList
        data={list}
        estimatedItemSize={10}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSep}
        ListHeaderComponent={ProductHeader}
        // contentContainerClassName="border"
      />

      <View className="h-28"></View>
    </Animated.ScrollView>
  );
};

export const UserProducts = ({ isDark, list }: Props) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const renderItem = useCallback(
    ({ item }: { item: IProductItem }) => {
      return (
        <ProductItem {...item} isDark={isDark} itemStyle="border border-ga" />
      );
    },
    [isDark],
  );

  const handleRequest = useCallback(async () => {
    await POST({ request: "ACCESS_TOKEN" });
  }, []);

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 48 }}
    >
      <PremiumCard title="to PRO" onPress={handleRequest} />
      <FlexRow className="justify-between h-10 -mb-10 px-4">
        <View className="flex flex-row items-center">
          <Text className="font-courg text-2xl text-dark-active -tracking-[0.16rem] dark:text-hyper-active">
            My
          </Text>
          <Text className="font-quickbold text-royal dark:text-chalk text-2xl -tracking-widest">
            Fast Cars
          </Text>
        </View>
        <TouchableOpacity className="rounded-full flex items-center justify-center size-7 bg-royal dark:bg-mortar">
          <Ionicons
            size={20}
            name="add"
            className="stroke-2"
            color={isDark ? Colors.dark.text : Colors.dark.text}
          />
        </TouchableOpacity>
      </FlexRow>

      <FlashList
        data={list}
        estimatedItemSize={10}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSep}
      />
      <View className="h-28"></View>
    </Animated.ScrollView>
  );
};
const ItemSep = () => <View style={{ height: 48 }} />;
const ListHeader = ({ title }: { title: string }) => (
  <Animated.View
    entering={ZoomInEasyUp.delay(0).duration(500).damping(8).mass(2)}
    className="h-14 overflow-hidden relative flex flex-col rounded-3xl items-start justify-center px-2"
  >
    <DAnimatedText
      fontSize={12}
      entering={ZoomInEasyDown.delay(70).duration(500).damping(5)}
      className="h-12 font-tight origin-center text-royal dark:text-chalk tracking-snug"
    >
      {title}
    </DAnimatedText>
  </Animated.View>
);
const ProductItem = ({
  id,
  name,
  image,
  textStyles,
  subtext,
  isDark,
  tag,
  itemStyle,
}: IProductItem & { isDark: boolean; itemStyle?: ClassName }) => {
  const handlePressGetStarted = useCallback(() => {
    console.log("Get Started button pressed");
    SheetManager.show("get-started", {
      payload: {
        isDark,
      },
    });
  }, [isDark]);

  const slicedText = useMemo(() => {
    const words = subtext?.slice().split(" ");
    return {
      a: words?.slice(0, words.length > 3 ? 2 : 1).join(" "),
      b: words
        ?.slice(words.length > 3 ? 2 : 1, words.length > 3 ? words.length : 4)
        .join(" "),
    };
  }, [subtext]);

  return (
    <Animated.View
      key={id}
      entering={FadeInDown.delay(400 + 100 * id).duration(500)}
      className={clsx(
        `overflow-hidden rounded-[36px] p-0.5 bg-grei dark:bg-ga ${itemStyle}`,
        itemStyle,
      )}
    >
      <View className="relative rounded-b-[21.5px] bg-void/30 rounded-t-[34px]  overflow-hidden h-72">
        <FlexRow className="absolute z-10 top-4 left-0 w-full px-6 justify-between">
          <View className="w-4/5 -space-y-1">
            <DText
              className={clsx(
                "font-hypertight dark:text-white -tracking-wider",
                textStyles ? textStyles : "text-chalk",
              )}
            >
              {slicedText.a}
            </DText>
            <SText
              className={clsx(
                "font-ultratight text-base -mt-1.5 tracking-snug dark:text-white dark:opacity-95 opacity-70",
                textStyles ? textStyles : "text-chalk",
              )}
            >
              {slicedText.b}
            </SText>
          </View>
          <View />
        </FlexRow>

        <LinearGradient
          className="flex size-full items-center justify-center flex-row"
          colors={isDark ? ["#b8b8bd", "#ffffff"] : ["#f2f2f2", "#ffffff"]}
          start={{ x: 0.5, y: 0 }}
        >
          <View className="size-full flex items-center justify-center flex-row">
            <Image
              source={{
                uri: image,
              }}
              resizeMode="cover"
              className="w-full aspect-auto h-full rounded-b-[20px]"
            />
          </View>
        </LinearGradient>
      </View>
      <FlexRow className="justify-between pt-1.5 px-3 h-[5.25rem]">
        <View className="flex-col items-start ps-2">
          <SText className="font-tight tracking-snug text-sm">{name}</SText>
          <FlexRow className="w-fit">
            <Text className="font-quick hidden w-fit border border-grei dark:border-ga capitalize tracking-tighter text-void">
              {tag}
            </Text>
          </FlexRow>
        </View>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handlePressGetStarted}
          className="rounded-full bg-void ps-5 pe-3.5 gap-x-1.5 h-[3.25rem] overflow-hidden flex flex-row items-center justify-center"
        >
          <SText
            className={clsx(
              "font-quickbold tracking-tighter mb-0.5 text-base",
              isDark ? "text-white" : "text-white",
            )}
          >
            Get Started
          </SText>
          <FlexRow className="rounded-full size-6">
            <Icon
              size={20}
              name="arrow-right-up"
              color={isDark ? "#53A9FF" : "#53A9FF"}
              className={clsx("", isDark ? " drop-shadow-xs" : "")}
            />
          </FlexRow>
        </TouchableOpacity>
      </FlexRow>
    </Animated.View>
  );
};
