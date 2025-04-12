"use client";

import { useState } from "react";
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

const { width } = Dimensions.get("window");
const HEADER_HEIGHT = 280;

const ProfileScreen = ({ navigation }: any) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [faceID, setFaceID] = useState(true);

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
        [HEADER_HEIGHT, 120],
        "clamp",
      ),
      opacity: interpolate(
        scrollY.value,
        [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
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
            [0, HEADER_HEIGHT - 100],
            [1, 0.6],
            "clamp",
          ),
        },
        {
          translateY: interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT - 100],
            [0, -30],
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

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <LinearGradient
          colors={["#1E293B", "#0F172A"]}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack()}
          >
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <Feather name="settings" size={22} color="#fff" />
          </TouchableOpacity>

          <Animated.View style={[styles.avatarContainer, avatarAnimatedStyle]}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={styles.avatar}
            />
            <View style={styles.verifiedBadge}>
              <Feather name="check" size={12} color="#fff" />
            </View>
          </Animated.View>

          <Animated.View style={[styles.profileInfo, nameAnimatedStyle]}>
            <Text style={styles.profileName}>Robert Lang</Text>
            <Text style={styles.profileEmail}>robert.lang@example.com</Text>
          </Animated.View>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View style={{ height: HEADER_HEIGHT - 50 }} />

        {/* Account Stats */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(700)}
          style={styles.statsContainer}
        >
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
          entering={FadeInDown.delay(300).duration(700)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <View style={styles.settingCard}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.settingIcon, { backgroundColor: "#EFF6FF" }]}
                >
                  <Feather name="user" size={20} color="#3B82F6" />
                </View>
                <Text style={styles.settingText}>Personal Information</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.settingDivider} />

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.settingIcon, { backgroundColor: "#F0FDF4" }]}
                >
                  <Feather name="credit-card" size={20} color="#10B981" />
                </View>
                <Text style={styles.settingText}>Payment Methods</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.settingDivider} />

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.settingIcon, { backgroundColor: "#FEF2F2" }]}
                >
                  <Feather name="shield" size={20} color="#EF4444" />
                </View>
                <Text style={styles.settingText}>Security</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Preferences */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(700)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.settingIcon, { backgroundColor: "#F8FAFC" }]}
                >
                  <Feather name="moon" size={20} color="#64748B" />
                </View>
                <Text style={styles.settingText}>Dark Mode</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#E2E8F0", true: "#0F172A" }}
                thumbColor={darkMode ? "#fff" : "#fff"}
                ios_backgroundColor="#E2E8F0"
              />
            </View>

            <View style={styles.settingDivider} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.settingIcon, { backgroundColor: "#F8FAFC" }]}
                >
                  <Feather name="bell" size={20} color="#64748B" />
                </View>
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#E2E8F0", true: "#0F172A" }}
                thumbColor={notifications ? "#fff" : "#fff"}
                ios_backgroundColor="#E2E8F0"
              />
            </View>

            <View style={styles.settingDivider} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.settingIcon, { backgroundColor: "#F8FAFC" }]}
                >
                  <Ionicons name="finger-print" size={20} color="#64748B" />
                </View>
                <Text style={styles.settingText}>Face ID / Touch ID</Text>
              </View>
              <Switch
                value={faceID}
                onValueChange={setFaceID}
                trackColor={{ false: "#E2E8F0", true: "#0F172A" }}
                thumbColor={faceID ? "#fff" : "#fff"}
                ios_backgroundColor="#E2E8F0"
              />
            </View>
          </View>
        </Animated.View>

        {/* Premium Card */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(700)}
          style={styles.section}
        >
          <LinearGradient
            colors={["#8B5CF6", "#6366F1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.premiumCard}
          >
            <View style={styles.premiumContent}>
              <View>
                <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
                <Text style={styles.premiumDescription}>
                  Get exclusive benefits and premium features
                </Text>
              </View>

              <TouchableOpacity style={styles.premiumButton}>
                <Text style={styles.premiumButtonText}>Upgrade</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Support */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(700)}
          style={[styles.section, { marginBottom: 30 }]}
        >
          <Text style={styles.sectionTitle}>Support</Text>

          <View style={styles.settingCard}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.settingIcon, { backgroundColor: "#F8FAFC" }]}
                >
                  <Feather name="help-circle" size={20} color="#64748B" />
                </View>
                <Text style={styles.settingText}>Help Center</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.settingDivider} />

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.settingIcon, { backgroundColor: "#F8FAFC" }]}
                >
                  <Feather name="message-circle" size={20} color="#64748B" />
                </View>
                <Text style={styles.settingText}>Contact Support</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
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
    marginTop: -40,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
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
