import { useCallback, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { HText } from "@/components/HyperText";

const SignInScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
      router.push("/(entry)/home");
    } catch (error) {
      setIsLoading(false);
      setError("Authentication failed. Please try again.");
      console.log("Error signing in:", error);
    }
  };

  const handleSkip = useCallback(() => {
    setIsLoading(false);
    router.push("/(entry)/home");
  }, []);

  return (
    <View className="flex-1 pt-20">
      <StatusBar translucent backgroundColor="transparent" />
      <View></View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <HText style={styles.title}>Personalization</HText>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={22}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {error ? <HText style={styles.errorText}>{error}</HText> : null}

          <TouchableOpacity onPress={handleSkip} style={styles.forgotPassword}>
            <HText style={styles.forgotPasswordText}>Forgot Password?</HText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <HText className="text-void" color="primary">
                Sign In
              </HText>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <HText style={styles.footerText}>Don't have an account? </HText>
          <TouchableOpacity onPress={handleSkip}>
            <HText style={styles.signUpText}>Sign Up</HText>
          </TouchableOpacity>
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
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 55,
    color: "#333",
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

export default SignInScreen;
