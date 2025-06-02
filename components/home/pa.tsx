import { DText, SText } from "@/components/FontScaling";
import { FlexRow } from "@/components/ui/FlexRow";
import { Colors } from "@/constants/Colors";
import { ClassName } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { clsx } from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInLeft,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { MinimalistCard } from "../cards/minimalist";
import { ItemSep, ListHeader, PrimaryCTA } from "../ui/FlashComponents";

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

export const PA_Products = ({ isDark, list }: Props) => {
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
    () => <ListHeader title="Personal Accident Protection" />,
    [],
  );

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 4 }}
    >
      <MinimalistCard
        value={10000}
        isDark={isDark}
        paddingVertical={10}
        title="Get Insured Today,"
        description="Claim the next day."
      />
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

export const User_PAProducts = ({ isDark, list }: Props) => {
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

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 48 }}
    >
      <FlexRow className="justify-between h-10 -mb-10 px-4">
        <View className="flex flex-row items-center">
          <Text className="font-courg text-2xl text-dark-active -tracking-[0.16rem] dark:text-hyper-active">
            My
          </Text>
          <Text className="font-quickbold text-royal dark:text-chalk text-2xl -tracking-widest">
            Personal Accident Insurance Coverage
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
  const router = useRouter();
  const getStarted = useCallback(() => {
    router.navigate("/(entry)/(pa)");
  }, [router]);
  const slicedText = useMemo(() => {
    const words = subtext?.slice().split(" ");
    return {
      a: words?.slice(0, words.length > 2 ? 2 : 1).join(" "),
      b: words
        ?.slice(words.length > 2 ? 2 : 1, words.length > 3 ? words.length : 4)
        .join(" "),
    };
  }, [subtext]);

  return (
    <Animated.View
      key={id}
      entering={FadeInLeft.delay(500 + 100 * id)
        .duration(400)
        .withInitialValues({ transform: [{ translateX: -10 }] })}
      className={clsx(
        `overflow-hidden rounded-[36px] p-0.5 bg-grei dark:bg-ga ${itemStyle}`,
        itemStyle,
      )}
    >
      <View className="relative rounded-b-[21.5px] bg-void/30 rounded-t-[34px]  overflow-hidden h-72">
        <FlexRow className="absolute z-10 top-4 left-0 w-full px-6 justify-between">
          <View className="w-4/5 -space-y-1">
            <DText
              fontSize={13}
              className={clsx(
                "font-ultratight dark:text-white tracking-tight",
                textStyles ? textStyles : "text-chalk",
              )}
            >
              {slicedText.a}
            </DText>
            <SText
              className={clsx(
                "font-tight text-base -mt-1.5 tracking-tight dark:text-offwhite dark:opacity-90 opacity-70",
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
          colors={isDark ? ["#b8b8bd", "#222222"] : ["#f2f2f2", "#ffffff"]}
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
        <PrimaryCTA label="get started" fn={getStarted} isDark={isDark} />
      </FlexRow>
    </Animated.View>
  );
};
