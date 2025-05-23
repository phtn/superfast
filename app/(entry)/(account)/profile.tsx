import { Icon } from "@/components/icons";
import { useAuth } from "@/ctx/auth";
import { DText } from "@/components/FontScaling";
import { Button } from "@/components/StyledButton";
import { HyperInput } from "@/components/StyledComponents";
import { FlexRow } from "@/components/ui/FlexRow";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { useCallback, useMemo, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Profile() {
  const [newDisplayName, setNewDisplayName] = useState<string | undefined>();
  const [newPhone, setNewPhone] = useState<string | undefined>();

  const { session, signOut, phone, displayName, updateProfile, loading } =
    useAuth();

  const { colorScheme } = useColorScheme();
  const isDark = useMemo(() => colorScheme === "dark", [colorScheme]);
  const goBack = () => {
    router.back();
  };

  const displayNameChange = useCallback((text: string) => {
    setNewDisplayName(text);
  }, []);
  const phoneChange = useCallback((text: string) => {
    setNewPhone(text);
  }, []);

  const handleUpdate = useCallback(() => {
    updateProfile({
      display_name: newDisplayName ?? displayName,
      phone: newPhone ?? phone,
    });
  }, [newDisplayName, newPhone, displayName, phone, updateProfile]);

  return (
    <View className="pt-16 pb-6 h-full bg-gray-200 dark:bg-transparent relative">
      <TouchableOpacity
        className="absolute top-16 z-10 left-6 size-10 rounded-full dark:bg-gray-300/5 flex flex-row items-center justify-center"
        onPress={goBack}
      >
        <Icon
          name="arrow-to-left"
          size={28}
          color={isDark ? Colors.dark.text : Colors.dark.royal}
          container="-rotate-90"
        />
      </TouchableOpacity>
      <Animated.View
        entering={FadeInDown.delay(100).duration(300)}
        className="pt-12 px-6"
      >
        <FlexRow className="justify-between">
          <View>
            <DText
              fontSize={12}
              className="h-8 font-ultratight tracking-tighter dark:text-chalk text-2xl"
            >
              Account
            </DText>
            <DText
              fontSize={8}
              className="text-sm font-quick dark:text-hyper-active"
            >
              {session?.user?.email}
            </DText>
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
          <DText
            fontSize={12}
            className="h-12 font-ultratight tracking-tighter dark:text-chalk text-lg"
          >
            Personal Info
          </DText>

          <View className="gap-y-4">
            <HyperInput
              fontSize={10}
              icon={"user-settings"}
              autoCapitalize={"none"}
              label="Display name"
              defaultValue={displayName}
              placeholder="name"
              onChangeText={displayNameChange}
            />
            <HyperInput
              fontSize={10}
              icon={"camera-outline"}
              label="Phone number"
              autoCapitalize={"none"}
              defaultValue={phone}
              placeholder="63"
              onChangeText={phoneChange}
            />
            {/* <TextInput
              solidIcon
              label="Website"
              value={website ?? ""}
              className="text-dark-active"
              placeholder="https://mysite.com"
              icon="gallery-wide-bold-duotone"
              onChangeText={(text) => setWebsite(text)}
            /> */}
            <View style={styles.verticallySpaced}>
              <Button
                variant="secondary"
                title={loading ? "Loading ..." : "Update"}
                onPress={handleUpdate}
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
