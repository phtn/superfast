import { FlexRow } from "@/components/ui/FlexRow";
import { Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useMemo } from "react";
import { Image, Platform, Text } from "react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import Animated, {
  FadeInDown,
  useAnimatedScrollHandler,
  useSharedValue,
  ZoomInEasyDown,
  ZoomInEasyUp,
} from "react-native-reanimated";
import { Icon } from "../icons";
import { FlashList } from "@shopify/flash-list";
import { PremiumCard } from "../cards/premium";
import { Colors } from "@/constants/Colors";

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
}

interface Props {
  isDark: boolean;
  list: IProductItem[];
}

const ItemSep = () => <View style={{ height: 48 }} />;
const ListHeader = ({ title }: { title: string }) => (
  <Animated.View
    entering={ZoomInEasyUp.delay(0).duration(500).damping(8).mass(2)}
    className="h-12 overflow-hidden relative flex flex-col rounded-3xl items-start justify-center px-2"
  >
    <Animated.Text
      entering={ZoomInEasyDown.delay(70).duration(500).damping(5)}
      className="h-12 font-quickbold origin-center text-royal dark:text-chalk text-xl tracking-tighter"
    >
      {title}
    </Animated.Text>
  </Animated.View>
);

export const Products = ({ isDark, list }: Props) => {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const renderItem = useCallback(({ item }: { item: IProductItem }) => {
    return <ProductItem {...item} isDark={isDark} />;
  }, []);

  const ProductHeader = useCallback(
    () => <ListHeader title="Car Insurance" />,
    [],
  );

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 48 }}
    >
      <FlashList
        data={list}
        estimatedItemSize={10}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSep}
        ListHeaderComponent={ProductHeader}
      />
      <PremiumCard
        title="Upgrade to PRO"
        onPress={() => console.log("premium")}
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

  const renderItem = useCallback(({ item }: { item: IProductItem }) => {
    return <ProductItem {...item} isDark={isDark} />;
  }, []);

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
      <FlashList
        data={list}
        estimatedItemSize={10}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSep}
      />

      <View className="h-48 w-full rounded-3xl overflow-hidden">
        <View className="dark:bg-ga flex-1"></View>
        <View className="bg-mortar flex-1"></View>
      </View>
      <View className="h-32 w-full rounded-3xl bg-mortar"></View>
      <View className="h-28 w-full rounded-3xl bg-medusa"></View>

      <PremiumCard
        title="Upgrade to PRO"
        onPress={() => console.log("premium")}
      />
      <View className="h-28"></View>
    </Animated.ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 10,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 36,
    borderWidth: 1,
    borderColor: "#007AFE",
    padding: 15,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  merchantContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  merchantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
  merchantRating: {
    fontSize: 12,
    color: "#64748B",
  },
  priceTag: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 5,
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  availabilityText: {
    fontSize: 12,
    color: "#64748B",
    marginLeft: 5,
  },
  buyButton: {
    backgroundColor: "#F9D75E",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 30,
  },
  buyButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  specialOfferContainer: {
    marginBottom: 20,
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  specialOfferGradient: {
    borderRadius: 20,
    paddingVertical: 20,
  },
  specialOfferContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  specialOfferTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 5,
  },
  specialOfferDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    maxWidth: "80%",
  },
  specialOfferButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 30,
  },
  specialOfferButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
});

export const SpecialOffer = () => {
  return (
    <Animated.View
      entering={FadeInDown.delay(600).duration(500)}
      style={styles.specialOfferContainer}
    >
      <LinearGradient
        colors={["#0A84FF", "#007AFE"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.specialOfferGradient}
      >
        <View style={styles.specialOfferContent}>
          <View>
            <Text className="font-quickbold text-xl text-white">
              Special Offer
            </Text>
            <Text style={styles.specialOfferDescription}>
              Get 5% cashback on all purchases today
            </Text>
          </View>
          <TouchableOpacity className="rounded-full flex-row flex-1 flex items-center justify-center gap-2 bg-white px-4 py-1.5">
            <Text className="font-quicksemi tracking-tighter">View Offers</Text>
            <Icon
              name="wallet"
              size={20}
              color="#14141b"
              className="text-royal"
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
// https://fastinsure-f1801.appspot.com/v0/o/ga-waves.png?alt=media
const storageBucket = process.env.EXPO_PUBLIC_F_STORAGEBUCKET;
const storageToken = process.env.FIREBASE_STORAGE_TOKEN;
const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}.appspot.com/o`;
const fileName = "wordmark.png";
const uri = `${baseUrl}/${fileName}?alt=media&token=${storageToken}`;

const ProductItem = ({
  id,
  name,
  image,
  textStyles,
  description,
  isDark,
}: IProductItem & { isDark: boolean }) => {
  const buttonGradients: readonly [string, string, ...string[]] = useMemo(
    () =>
      isDark
        ? ["#14141b", "#14141b", "#14141b"]
        : ["#14141b", "#14141b", "#14141b"],
    [isDark],
  );
  const productGradients: readonly [string, string, ...string[]] = useMemo(
    () =>
      isDark
        ? [
            "#28282e",
            "#28282e",
            "#29292f",
            "#29292f",
            "#2a2a30",
            "#2a2a30",
            "#2a2a30",
            "#29292f",
            "#29292f",
            "#29292f",
            "#2b2b31",
            "#2b2b31",
            "#2a2a30",
            "#333338",
            "#434347",
            "#2a2a30",
            "#2a2a30",
          ]
        : [
            "#2f2f2f",
            "#2f2f2f",
            "#2e2e2e",
            "#2e2e2e",
            "#2e2e2e",
            "#2e2e2e",
            "#2f2f2f",
            "#2f2f2f",
            "#2f2f2f",
            "#2d2d2d",
            "#2c2c2c",
            "#2b2b2b",
            "#303030",
            "#404040",
            "#505050",
            "#2f2f2f",
            "#2f2f2f",
          ],
    [isDark],
  );
  const handlePressGetStarted = useCallback(() => {
    console.log("Get Started button pressed");
    SheetManager.show("get-started");
  }, []);

  return (
    <Animated.View
      key={id}
      entering={FadeInDown.delay(400 + 100 * id).duration(500)}
      className={clsx(
        "overflow-hidden rounded-[36px] p-1.5 bg-grei dark:bg-ga",
      )}
    >
      <View className="relative rounded-b-3xl rounded-t-[32px] overflow-hidden h-64">
        <FlexRow className="absolute z-10 top-6 left-0 w-full px-6 justify-between">
          <View className="w-3/5">
            <Text
              className={clsx(
                "font-quicksemi text-xl tracking-tighter",
                textStyles ? textStyles : "text-chalk",
              )}
            >
              {description}
            </Text>
          </View>
          <View className="">
            <Text></Text>
          </View>
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
          <Text className="font-quickbold tracking-tight text-void text-lg">
            {name}
          </Text>
          <FlexRow className="gap-x-1 w-fit">
            <Text className="font-quick tracking-tighter text-void">
              Insurance
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
                "h-12 ps-5 pe-3.5 border-[0.33px] bg-ga/15 rounded-full gap-x-1",
                isDark ? "border-light-ga/80 bg-void/60" : "border-ga/40",
              )}
            >
              <Text
                className={clsx(
                  "font-quickbold tracking-tighter",
                  Platform.OS === "ios" ? "mb-0.5" : "mb-1",
                  isDark ? "text-white" : "text-white",
                )}
              >
                Get Started
              </Text>
              <FlexRow className="rounded-full size-6">
                <Icon
                  name="arrow-right-up-broken"
                  size={20}
                  color={isDark ? "#53A9FF" : "#53A9FF"}
                  className={clsx(
                    // "-rotate-45",
                    "",
                    isDark ? " drop-shadow-xs" : "",
                  )}
                />
              </FlexRow>
            </FlexRow>
          </LinearGradient>
        </TouchableOpacity>
      </FlexRow>
    </Animated.View>
  );
};

/*
[
            "#3B9DFF",
            "#3B9DFF",
            "#3B9DFF",
            "#3B9DFF",
            "#45a2ff",
            "#45a2ff",
            "#45a2ff",
            "#45a2ff",
            "#4fa7ff",
            "#4fa7ff",
            "#58acff",
            "#58acff",
            "#60afff",
            "#60afff",
          ]
*/
