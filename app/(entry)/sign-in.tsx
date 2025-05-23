import { useCallback, useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
  PermissionsAndroid,
  Text,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { RelativePathString, useRouter } from "expo-router";
import { HText } from "@/components/HyperText";
import { FlexRow, FrBtn } from "@/components/ui/FlexRow";
import { Icon } from "@/components/icons";

import * as Device from "expo-device";
import { useAuth } from "@/ctx/auth";

// import auth from "@react-native-firebase/auth";

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  // Get the users ID token
  // Try the new style of google-sign in result, from v13+ of that module
  // Create a Google credential with the token

  // Sign-in the user with the credential
  return null;
}

const SignInScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [deviceNumber, setDeviceNumber] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter both email and password");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, you would validate credentials with your backend
      // For this example, we'll simulate a successful login

      // Store authentication token
      await SecureStore.setItemAsync("userToken", "dummy-auth-token");

      setIsLoading(false);
      router.navigate("/(entry)/(home)" as RelativePathString);
    } catch (error) {
      setIsLoading(false);
      setError("Authentication failed. Please try again.");
      console.log("Error signing in:", error);
    }
  };

  const handleSkip = useCallback(() => {
    setIsLoading(false);
    router.push("/(entry)/(home)" as RelativePathString);
  }, []);

  const { signinWithGoogle } = useAuth();

  const handleGoogleSignIn = useCallback(async () => {
    setIsGoogleLoading(true);
    await signinWithGoogle();
  }, [onGoogleButtonPress]);

  return (
    <View className="flex-1 pt-20">
      <StatusBar translucent backgroundColor="transparent" />
      <View></View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <FlexRow className="h-56 px-2">
          <Text className="font-sat rotate-3 text-dark-active -tracking-widest mt-1.5 text-3xl">
            My
          </Text>

          <Text className="font-bold -tracking-[0.06em] text-4xl text-void dark:text-white">
            FastInsure
          </Text>
        </FlexRow>
        <FlexRow className="h-14"></FlexRow>

        <View style={styles.form}>
          <FlexRow className="rounded-xl mb-4 px-5 bg-white border border-royal/40">
            <Ionicons
              name="mail-outline"
              size={20}
              color="#0F172A"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone number or Email Address"
              placeholderTextColor="#bbb"
              keyboardType="email-address"
              autoCapitalize="none"
              value={deviceNumber ?? email}
              onChangeText={setEmail}
              className="font-quicksemi text-active"
            />
          </FlexRow>

          {/* <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#0F172A"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#bbb"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              className="font-quicksemi text-royal"
            />
          </View> */}

          {error ? <HText style={styles.errorText}>{error}</HText> : null}

          <TouchableOpacity
            onPress={handleSkip}
            className="h-8 opacity-0 self-end align-middle flex items-start px-2 flex-row"
          >
            <Text className="text-sm text-dark-active tracking-tighter font-quicksemi">
              Forgot password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-dark-active flex flex-row items-center justify-center rounded-2xl h-16"
            onPress={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white tracking-tighter font-quickbold">
                Sign In
              </Text>
            )}
          </TouchableOpacity>
          <FlexRow className="h-12">
            <Text className="text-sm">or</Text>
          </FlexRow>
          <TouchableOpacity
            className="bg-ghost flex border border-void flex-row items-center justify-center rounded-2xl h-16"
            onPress={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isGoogleLoading ? (
              <ActivityIndicator color="#14141b" />
            ) : (
              <FlexRow className="gap-x-4">
                <Text className="text-royal tracking-tighter font-quickbold">
                  Continue with Google
                </Text>
                <Icon name="google" solid color="#222" className="size-6" />
              </FlexRow>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text className="dark:text-chalk/70 text-sm text-royal/80 font-quicksemi mr-2">
            Don't have an account?{" "}
          </Text>
          <FrBtn onPress={handleSkip}>
            <Text className="text-dark-active -tracking-[0.02em] px-1 rounded-md text-sm font-quicksemi">
              Sign up
            </Text>
            <Ionicons
              name="arrow-up-outline"
              className="size-fit rotate-45"
              color="#007AFE"
            />
          </FrBtn>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

// Styles for SignInScreen
const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    paddingHorizontal: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 55,
    fontSize: 16,
  },
  errorText: {
    color: "#ff3b30",
    marginBottom: 16,
    marginLeft: 8,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#46515F",
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: "#46515F",
    borderRadius: 12,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  footerText: {
    color: "#666",
    fontSize: 16,
  },
  signUpText: {
    color: "#46515F",
    fontSize: 16,
    fontWeight: "600",
  },
});

const getPhoneNumber = async () => {
  // This primarily works on Android, not iOS
  if (Platform.OS === "ios") {
    console.log("iOS does not allow access to phone number via API");
    return null;
  }

  try {
    // Request READ_PHONE_STATE permission
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      {
        title: "Phone Number Permission",
        message:
          "This app needs access to your phone number to provide personalized services.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Try to get the phone number
      const phoneNumber = Device.brand;

      // Note: On many devices/carriers this might still return an empty string
      // even with permission granted
      if (phoneNumber && phoneNumber !== "") {
        console.log("Phone number:", phoneNumber);
        return phoneNumber;
      } else {
        console.log("Phone number not available or empty");
        return null;
      }
    } else {
      console.log("Phone number permission denied");
      return null;
    }
  } catch (error) {
    console.error("Error getting phone number:", error);
    return null;
  }
};

export default SignInScreen;
