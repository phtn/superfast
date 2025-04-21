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
} from "react-native-reanimated";

export interface IProductItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  subtext?: string;
  coverage?: string;
}

interface Props {
  isDark: boolean;
  list: IProductItem[];
}

export const Products = ({ isDark, list }: Props) => {
  const buttonGradients: readonly [string, string, ...string[]] = useMemo(
    () =>
      isDark
        ? [
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
        : [
            "#007AFE",
            "#007AFE",
            "#007AFE",
            "#0A84FF",
            "#0A84FF",
            "#0A84FF",
            "#3B9DFF",
            "#0A84FF",
            "#53A9FF",
            "#60afff",
          ],
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

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const handlePressGetStarted = useCallback(() => {
    console.log("Get Started button pressed");
    SheetManager.show("get-started");
  }, []);

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 32 }}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      {/* Spacer to account for categories */}
      {/* <View style={{ height: CATEGORIES_HEIGHT }} /> */}

      {/* Featured Product */}
      {list.map((product) => (
        <Animated.View
          key={product.id}
          entering={FadeInDown.delay(400 + 100 * product.id).duration(500)}
          className="overflow-hidden rounded-[36px] border-none border-royal/80 p-1.5 bg-ga dark:bg-ga"
        >
          <View className="relative rounded-b-3xl rounded-t-[32px] overflow-hidden h-64">
            <FlexRow className="absolute z-10 top-6 left-0 w-full px-6 justify-between">
              <View className="w-3/5">
                <Text className="font-quicksemi text-2xl text-white tracking-tighter">
                  {product.description}
                </Text>
              </View>
              <View className="">
                <Text></Text>
              </View>
            </FlexRow>

            <LinearGradient
              className="flex size-full items-center justify-center flex-row"
              colors={productGradients}
              start={{ x: 0.5, y: 0 }}
            >
              <View className="size-full flex items-center justify-center flex-row">
                <Image
                  source={require(`${"@/assets/images/gray-icon.png"}`)}
                  resizeMode="contain"
                  className="w-1/2 aspect-auto mt-20 h-auto"
                />
              </View>
            </LinearGradient>
          </View>
          <FlexRow className="justify-between pt-1.5 px-2.5 h-20">
            <View className="flex-col items-start ps-2">
              <Text className="font-quickbold tracking-tight text-royal text-lg">
                {product.name}
              </Text>
              <FlexRow className="gap-x-1 w-fit">
                <Text className="font-quick tracking-tighter opacity-60 text-sm">
                  {product.subtext}
                </Text>
              </FlexRow>
            </View>

            <TouchableOpacity
              onPress={handlePressGetStarted}
              className="h-12 overflow-hidden rounded-full flex flex-row items-center justify-center"
            >
              <LinearGradient start={{ x: 0, y: 0 }} colors={buttonGradients}>
                <FlexRow className="h-12 ps-4 pe-3 rounded-full gap-x-3">
                  <Text
                    className={clsx(
                      "text-white text-lg font-quickbold tracking-tighter",
                      Platform.OS === "ios" ? "mb-0.5" : "mb-1",
                    )}
                  >
                    Get Started
                  </Text>
                  <FlexRow className="rounded-full bg-white size-6">
                    <Ionicons name="arrow-forward" size={14} color="#53A9FF" />
                  </FlexRow>
                </FlexRow>
              </LinearGradient>
            </TouchableOpacity>
          </FlexRow>
        </Animated.View>
      ))}
      <View className="h-28"></View>
    </Animated.ScrollView>
  );
};

export const UserProducts = ({ isDark, list }: Props) => {
  const fullGradients: readonly [string, string, ...string[]] = useMemo(
    () =>
      isDark
        ? [
            "#28282e",
            "#28282e",
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
          ]
        : [
            "#007AFE",
            "#007AFE",
            "#007AFE",
            "#0A84FF",
            "#0A84FF",
            "#0A84FF",
            "#3B9DFF",
            "#0A84FF",
            "#53A9FF",
            "#60afff",
          ],
    [isDark],
  );
  const buttonGradients: readonly [string, string, ...string[]] = useMemo(
    () =>
      isDark
        ? [
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
        : [
            "#007AFE",
            "#007AFE",
            "#007AFE",
            "#0A84FF",
            "#0A84FF",
            "#0A84FF",
            "#3B9DFF",
            "#0A84FF",
            "#53A9FF",
            "#60afff",
          ],
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

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 32 }}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      {/* Spacer to account for categories */}

      <FlexRow className="justify-between h-16 -mb-6 px-3">
        <View className="flex flex-row items-center">
          <Text className="font-sat text-2xl rotate-12 text-active mt-1 dark:text-dark-active">
            My
          </Text>
          <Text className="font-bold text-royal -tracking-widest dark:text-chalk text-2xl">
            Fast Cars
          </Text>
        </View>
        <TouchableOpacity className="rounded-full flex items-center justify-center size-7 bg-royal dark:bg-white">
          <Ionicons
            name="add"
            size={20}
            className="stroke-2"
            color={isDark ? "#0F172A" : "#FFFFFF"}
          />
        </TouchableOpacity>
      </FlexRow>
      {/* <View style={{ height: CATEGORIES_HEIGHT }} /> */}

      {/* Featured Product */}
      {list.map((product) => (
        <Animated.View
          key={product.id}
          entering={FadeInDown.delay(400 + 100 * product.id).duration(500)}
          className="overflow-hidden rounded-[36px] border-none border-royal/80 p-1.5 bg-ga dark:bg-ga"
        >
          <View className="relative rounded-b-3xl rounded-t-[32px] overflow-hidden h-64">
            <FlexRow className="absolute z-10 top-6 left-0 w-full px-6 justify-between">
              <View className="w-3/5">
                <Text className="font-quicksemi text-2xl text-white tracking-tighter">
                  {product.description}
                </Text>
              </View>
              <View className="">
                <Text></Text>
              </View>
            </FlexRow>

            <LinearGradient
              className="flex size-full items-center justify-center flex-row"
              colors={productGradients}
              start={{ x: 0.5, y: 0 }}
            >
              <View className="size-full flex items-center justify-center flex-row">
                <Image
                  source={require(`${"@/assets/images/gray-icon.png"}`)}
                  resizeMode="contain"
                  className="w-1/2 aspect-auto mt-20 h-auto"
                />
              </View>
            </LinearGradient>
          </View>
          <FlexRow className="justify-between pt-1.5 px-2.5 h-20">
            <View className="flex-col items-start ps-2">
              <Text className="font-quickbold tracking-tight text-royal text-lg">
                {product.name}
              </Text>
              <FlexRow className="gap-x-1 w-fit">
                <Text className="font-quick tracking-tighter opacity-60 text-sm">
                  {product.subtext}
                </Text>
              </FlexRow>
            </View>

            <TouchableOpacity className="h-12 overflow-hidden rounded-full flex flex-row items-center justify-center">
              <LinearGradient start={{ x: 0, y: 0 }} colors={fullGradients}>
                <FlexRow className="h-12 ps-4 pe-3 rounded-full gap-x-3">
                  <Text
                    className={clsx(
                      "text-white text-lg font-quickbold tracking-tighter",
                      Platform.OS === "ios" ? "mb-0.5" : "mb-1",
                    )}
                  >
                    {product.coverage}
                  </Text>
                  <FlexRow className="rounded-full relative size-4 bg-chalk">
                    <Ionicons
                      name="shield-checkmark"
                      size={20}
                      color="#0A84FF"
                      className="absolute"
                    />
                  </FlexRow>
                </FlexRow>
              </LinearGradient>
            </TouchableOpacity>
          </FlexRow>
        </Animated.View>
      ))}
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
    paddingHorizontal: 20,
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
    borderRadius: 20,
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
    padding: 20,
  },
  specialOfferContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    paddingHorizontal: 15,
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
        colors={["#1E293B", "#0F172A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.specialOfferGradient}
      >
        <View style={styles.specialOfferContent}>
          <View>
            <Text style={styles.specialOfferTitle}>Special Offer</Text>
            <Text style={styles.specialOfferDescription}>
              Get 5% cashback on all purchases today
            </Text>
          </View>
          <TouchableOpacity style={styles.specialOfferButton}>
            <Text style={styles.specialOfferButtonText}>View Offers</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
