import { HText } from "@/components/HyperText";
import { FlexRow } from "@/components/ui/FlexRow";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text } from "react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

export const Products = () => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const products = [
    {
      id: 0,
      name: "iPhone 13 Pro Max",
      price: 999,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      merchant: "Apple Store",
      rating: 95,
    },
    {
      id: 1,
      name: "Samsung Galaxy S21 Ultra",
      price: 899,
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      merchant: "Samsung Store",
      rating: 90,
    },
    {
      id: 2,
      name: "Google Pixel 6 Pro",
      price: 799,
      image: "https://randomuser.me/api/portraits/women/46.jpg",
      merchant: "Google Store",
      rating: 85,
    },
    {
      id: 3,
      name: "Google Pixel 6 Pro",
      price: 799,
      image: "https://randomuser.me/api/portraits/women/46.jpg",
      merchant: "Google Store",
      rating: 85,
    },
    {
      id: 4,
      name: "Google Pixel 6 Pro",
      price: 799,
      image: "https://randomuser.me/api/portraits/women/46.jpg",
      merchant: "Google Store",
      rating: 85,
    },
  ];

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10, gap: 24 }}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      {/* Spacer to account for categories */}
      {/* <View style={{ height: CATEGORIES_HEIGHT }} /> */}

      {/* Featured Product */}
      {products.map((product) => (
        <Animated.View
          key={product.id}
          entering={FadeInDown.delay(400 + 100 * product.id).duration(500)}
          className="overflow-hidden rounded-[36px] border-[0.33px] border-gray-500 p-1.5 bg-white"
        >
          <View className="relative rounded-b-xl rounded-t-[32px] overflow-hidden h-64">
            <FlexRow className="absolute z-10 h-20 right-0 px-6 justify-end">
              <View className="">
                <Text>{product.price}</Text>
              </View>
            </FlexRow>

            <Image
              source={{
                uri: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708",
              }}
              resizeMode="cover"
              className="w-auto h-64"
            />
          </View>
          <FlexRow className="justify-between pt-1.5 px-3 h-20">
            <View>
              <HText>{product.name}</HText>
              <View style={styles.availabilityContainer}>
                <Feather name="clock" size={14} color="#64748B" />
                <Text style={styles.availabilityText}>Detail</Text>
              </View>
            </View>
            <TouchableOpacity className="h-12 bg-active flex flex-row items-center justify-center px-8 rounded-full">
              <HText
                className="text-white font-space tracking-tight"
                weight="semibold"
              >
                Get Started
              </HText>
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
