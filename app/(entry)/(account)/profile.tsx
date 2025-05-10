import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "@/components/StyledComponents";
import { Button } from "@/components/StyledButton";
import { useAuth } from "@/app/_ctx/auth";
import { FlexRow } from "@/components/ui/FlexRow";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Icon } from "@/app/_components/icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const { session, signOut } = useAuth();

  const { colorScheme } = useColorScheme();
  const isDarkMode = useMemo(() => colorScheme === "dark", [colorScheme]);
  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`display_name, phone, website`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setDisplayName(data.display_name);
        setPhone(data.phone);
        setWebsite(data.website);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    display_name,
    phone,
    website,
  }: {
    display_name: string;
    phone: string;
    website: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        display_name,
        phone,
        website,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("user_profiles").upsert(updates);

      if (error) {
        console.log(error);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const displayNameChange = useCallback((text: string) => {
    setDisplayName(text);
  }, []);
  const phoneChange = useCallback((text: string) => {
    setPhone(text);
  }, []);

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
        className="py-12 px-6"
      >
        <FlexRow className="justify-between">
          <View>
            <Text className="h-8 font-ultratight tracking-tighter dark:text-chalk text-2xl">
              Account
            </Text>
            <Text className="text-sm font-quick dark:text-hyper-active">
              {session?.user?.email}
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
          className="py-12 px-6"
        >
          <Text className="h-10 font-ultratight tracking-tighter dark:text-chalk text-lg">
            Personal Info
          </Text>

          <View className="gap-y-4">
            <TextInput
              icon={"user-settings"}
              autoCapitalize={"none"}
              label="Display name"
              defaultValue={session?.user?.user_metadata.name}
              placeholder="name"
              onChangeText={displayNameChange}
            />
            <TextInput
              icon={"camera-outline"}
              label="Phone number"
              autoCapitalize={"none"}
              value={session?.user?.user_metadata.phone}
              placeholder="63"
              onChangeText={phoneChange}
            />
            <TextInput
              icon="gallery-wide-bold-duotone"
              label="Website"
              value={website ?? ""}
              placeholder="https://mysite.com"
              className="text-dark-active"
              onChangeText={(text) => setWebsite(text)}
            />
            <View style={styles.verticallySpaced}>
              <Button
                variant="secondary"
                title={loading ? "Loading ..." : "Update"}
                onPress={() =>
                  updateProfile({ display_name: displayName, phone, website })
                }
                disabled={loading}
              />
            </View>
          </View>
        </Animated.View>
      </Animated.ScrollView>
      <View className="flex-1 flex"></View>

      <View className="gap-y-4">
        <View className="px-6">
          <Button title="Sign Out" onPress={signOut} />
        </View>
        <View className="px-6">
          <Button variant="light" title="Delete Account" onPress={signOut} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
