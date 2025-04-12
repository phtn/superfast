"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 40;
const HEADER_HEIGHT = Platform.OS === "ios" ? 140 : 110;
const CATEGORIES_HEIGHT = 100;

const ShopScreen = ({ navigation }: any) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const categoriesAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, CATEGORIES_HEIGHT],
            [0, -CATEGORIES_HEIGHT],
            Extrapolate.CLAMP,
          ),
        },
      ],
      opacity: interpolate(
        scrollY.value,
        [0, CATEGORIES_HEIGHT, CATEGORIES_HEIGHT + 50],
        [1, 0.3, 0],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <View className="flex-1 pt-8 bg-ghost">
      {/* Header - Fixed */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => navigation?.goBack()}
          >
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text style={styles.subtitleText}>Shop Exclusive Offers</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar - Fixed */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#94A3B8"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Feather name="search" size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories - Will scroll up and hide */}
      <Animated.View
        style={[styles.categoriesContainer, categoriesAnimatedStyle]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          <TouchableOpacity
            style={[
              styles.categoryButton,
              activeCategory === "All" && styles.categoryButtonActive,
            ]}
            onPress={() => setActiveCategory("All")}
          >
            <Feather
              name="grid"
              size={24}
              color={activeCategory === "All" ? "#0F172A" : "#64748B"}
            />
            <Text
              style={[
                styles.categoryText,
                activeCategory === "All" && styles.categoryTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryButton,
              activeCategory === "Electronics" && styles.categoryButtonActive,
            ]}
            onPress={() => setActiveCategory("Electronics")}
          >
            <Feather
              name="smartphone"
              size={24}
              color={activeCategory === "Electronics" ? "#0F172A" : "#64748B"}
            />
            <Text
              style={[
                styles.categoryText,
                activeCategory === "Electronics" && styles.categoryTextActive,
              ]}
            >
              Electronics
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryButton,
              activeCategory === "Fashion" && styles.categoryButtonActive,
            ]}
            onPress={() => setActiveCategory("Fashion")}
          >
            <Feather
              name="shopping-bag"
              size={24}
              color={activeCategory === "Fashion" ? "#0F172A" : "#64748B"}
            />
            <Text
              style={[
                styles.categoryText,
                activeCategory === "Fashion" && styles.categoryTextActive,
              ]}
            >
              Fashion
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryButton,
              activeCategory === "Travel" && styles.categoryButtonActive,
            ]}
            onPress={() => setActiveCategory("Travel")}
          >
            <Feather
              name="map"
              size={24}
              color={activeCategory === "Travel" ? "#0F172A" : "#64748B"}
            />
            <Text
              style={[
                styles.categoryText,
                activeCategory === "Travel" && styles.categoryTextActive,
              ]}
            >
              Travel
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>

      {/* Main Scrollable Content */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Spacer to account for categories */}
        <View style={{ height: CATEGORIES_HEIGHT }} />

        {/* Featured Product */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(500)}
          style={styles.productCard}
        >
          <View style={styles.productHeader}>
            <View style={styles.merchantContainer}>
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/women/44.jpg",
                }}
                style={styles.merchantAvatar}
              />
              <View>
                <Text style={styles.merchantName}>Apple Store</Text>
                <Text style={styles.merchantRating}>95% Satisfaction Rate</Text>
              </View>
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>$999</Text>
            </View>
          </View>

          <Image
            source={{
              uri: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708",
            }}
            style={styles.productImage}
            resizeMode="contain"
          />

          <View style={styles.productFooter}>
            <View>
              <Text style={styles.productName}>iPhone 15 Pro</Text>
              <View style={styles.availabilityContainer}>
                <Feather name="clock" size={14} color="#64748B" />
                <Text style={styles.availabilityText}>Free 2-day shipping</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Second Product */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(500)}
          style={styles.productCard}
        >
          <View style={styles.productHeader}>
            <View style={styles.merchantContainer}>
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/men/66.jpg",
                }}
                style={styles.merchantAvatar}
              />
              <View>
                <Text style={styles.merchantName}>Samsung Official</Text>
                <Text style={styles.merchantRating}>87% Satisfaction Rate</Text>
              </View>
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>$849</Text>
            </View>
          </View>

          <Image
            source={{
              uri: "https://images.samsung.com/is/image/samsung/p6pim/levant/2307/gallery/levant-galaxy-z-fold5-f946-sm-f946bzagmea-thumb-537234073",
            }}
            style={styles.productImage}
            resizeMode="contain"
          />

          <View style={styles.productFooter}>
            <View>
              <Text style={styles.productName}>Galaxy Z Fold 5</Text>
              <View style={styles.availabilityContainer}>
                <Feather name="clock" size={14} color="#64748B" />
                <Text style={styles.availabilityText}>Ships in 24hrs</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Special Offer */}
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

        {/* Third Product */}
        <Animated.View
          entering={FadeInDown.delay(700).duration(500)}
          style={[styles.productCard, { marginBottom: 100 }]}
        >
          <View style={styles.productHeader}>
            <View style={styles.merchantContainer}>
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/women/22.jpg",
                }}
                style={styles.merchantAvatar}
              />
              <View>
                <Text style={styles.merchantName}>Sony Electronics</Text>
                <Text style={styles.merchantRating}>92% Satisfaction Rate</Text>
              </View>
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>$349</Text>
            </View>
          </View>

          <Image
            source={{
              uri: "https://electronics.sony.com/image/5d02da5df552836db894cead8a68f5f3?fmt=png-alpha&wid=720&hei=720",
            }}
            style={styles.productImage}
            resizeMode="contain"
          />

          <View style={styles.productFooter}>
            <View>
              <Text style={styles.productName}>Sony WH-1000XM5</Text>
              <View style={styles.availabilityContainer}>
                <Feather name="clock" size={14} color="#64748B" />
                <Text style={styles.availabilityText}>In stock</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="home" size={24} color="#94A3B8" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Feather name="calendar" size={24} color="#94A3B8" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <View style={styles.activeNavBackground}>
            <Feather name="shopping-bag" size={24} color="#fff" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Feather name="message-circle" size={24} color="#94A3B8" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Feather name="user" size={24} color="#94A3B8" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingBottom: 15,
    backgroundColor: "#F8FAFC",
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  welcomeContainer: {
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 2,
  },
  subtitleText: {
    fontSize: 14,
    color: "#64748B",
  },
  notificationButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#F8FAFC",
    zIndex: 9,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#0F172A",
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  categoriesContainer: {
    height: CATEGORIES_HEIGHT,
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 8,
    backgroundColor: "#F8FAFC",
    marginTop: 90,
  },
  categoriesScroll: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  categoryButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  categoryButtonActive: {
    backgroundColor: "#F1F5F9",
  },
  categoryText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "500",
    color: "#64748B",
  },
  categoryTextActive: {
    color: "#0F172A",
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
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
    marginBottom: 15,
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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingBottom: Platform.OS === "ios" ? 30 : 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  navItemActive: {
    transform: [{ translateY: -20 }],
  },
  activeNavBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default ShopScreen;
