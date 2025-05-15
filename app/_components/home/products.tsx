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
import { PremiumCard } from "../cards/premium";
import { Icon } from "../icons";

export interface IProductItem {
  id: number;
  name: string;
  price?: number;
  image?: string;
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

const ItemSep = () => <View style={{ height: 48 }} />;
const ListHeader = ({ title }: { title: string }) => (
  <Animated.View
    entering={ZoomInEasyUp.delay(0).duration(500).damping(8).mass(2)}
    className="h-14 overflow-hidden relative flex flex-col rounded-3xl items-start justify-center px-2"
  >
    <DAnimatedText
      fontSize={16}
      entering={ZoomInEasyDown.delay(70).duration(500).damping(5)}
      className="h-12 font-quickbold origin-center text-royal dark:text-chalk text-xl tracking-tighter"
    >
      {title}
    </DAnimatedText>
  </Animated.View>
);

export const Products = ({ isDark, list }: Props) => {
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
      contentContainerStyle={{ paddingHorizontal: 16, gap: 32 }}
    >
      <PremiumCard
        title="Upgrade to PRO"
        onPress={() => console.log("premium")}
      />
      <FlashList
        data={list}
        estimatedItemSize={10}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSep}
        ListHeaderComponent={ProductHeader}
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
      return <ProductItem {...item} isDark={isDark} />;
    },
    [isDark],
  );

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 48 }}
    >
      <FlexRow className="justify-between h-14 -mb-12 px-3">
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
            color={isDark ? Colors.dark.royal : Colors.dark.text}
          />
        </TouchableOpacity>
      </FlexRow>
      {/* Featured Product */}
      <PremiumCard title="to PRO" onPress={() => console.log("premium")} />
      <FlashList
        data={list}
        estimatedItemSize={10}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSep}
      />

      {/* <View className="h-48 w-full rounded-3xl overflow-hidden">
        <View className="dark:bg-ga flex-1"></View>
        <View className="bg-mortar flex-1"></View>
      </View>
      <View className="h-32 w-full rounded-3xl bg-mortar"></View>
      <View className="h-28 w-full rounded-3xl bg-medusa"></View> */}

      <View className="h-28"></View>
    </Animated.ScrollView>
  );
};

const ProductItem = ({
  id,
  name,
  image,
  textStyles,
  subtext,
  isDark,
  tag,
}: IProductItem & { isDark: boolean }) => {
  const buttonGradients: readonly [string, string, ...string[]] = useMemo(
    () =>
      isDark
        ? ["#14141b", "#14141b", "#14141b"]
        : ["#14141b", "#14141b", "#14141b"],
    [isDark],
  );

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
        "overflow-hidden rounded-[36px] p-1.5 bg-grei dark:bg-ga",
      )}
    >
      <View className="relative rounded-b-3xl rounded-t-[32px] overflow-hidden h-64">
        <FlexRow className="absolute z-10 top-4 left-0 w-full px-6 justify-between">
          <View className="w-3/5 -space-y-1">
            <DText
              fontSize={11}
              className={clsx(
                "font-hypertight shadow-md shadow-active text-xl dark:text-white -tracking-wider",
                textStyles ? textStyles : "text-chalk",
              )}
            >
              {slicedText.a}
            </DText>
            <SText
              className={clsx(
                "font-tight text-lg -mt-1.5 text-hades dark:text-void opacity-80 tracking-snug",
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
              className="w-full aspect-auto h-full"
            />
          </View>
        </LinearGradient>
      </View>
      <FlexRow className="justify-between pt-1.5 px-3 h-20">
        <View className="flex-col items-start ps-2">
          <SText className="font-tight tracking-snug text-lg">{name}</SText>
          <FlexRow className="w-fit">
            <Text className="font-quick hidden w-fit border border-grei dark:border-ga capitalize tracking-tighter text-void">
              {tag}
            </Text>
          </FlexRow>
        </View>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handlePressGetStarted}
          className="h-12 overflow-hidden rounded-full flex flex-row items-center justify-center"
        >
          <LinearGradient start={{ x: 0, y: 0 }} colors={buttonGradients}>
            <FlexRow
              className={clsx(
                "h-12 ps-5 pe-3.5 border-[0.33px] bg-ga/15 rounded-full gap-x-1.5",
                isDark ? "border-light-ga/80 bg-void/60" : "border-ga/40",
              )}
            >
              <SText
                className={clsx(
                  "font-quickbold tracking-tighter mb-0.5 text-lg",
                  isDark ? "text-white" : "text-white",
                )}
              >
                Get Started
              </SText>
              <FlexRow className="rounded-full size-6">
                <Icon
                  name="arrow-right-up"
                  size={24}
                  color={isDark ? "#53A9FF" : "#53A9FF"}
                  className={clsx("", isDark ? " drop-shadow-xs" : "")}
                />
              </FlexRow>
            </FlexRow>
          </LinearGradient>
        </TouchableOpacity>
      </FlexRow>
    </Animated.View>
  );
};
