import { SBAuth } from "@/components/Auth";
import { FlexRow } from "@/components/ui/FlexRow";
import { supabase } from "@/lib/supabase";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { RelativePathString, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useConfigCtx } from "../_ctx/config";
import pkg from "../../package.json";

const SignInScreen = () => {
  const router = useRouter();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const [session] = useState<Session | null>(null);
  const { getFileUri } = useConfigCtx();
  const re_up_logo = useMemo(
    () => getFileUri("RE_UP_LOGO_DARK_MONO.png"),
    [getFileUri],
  );
  const fast_logo = useMemo(
    () => getFileUri("FAST_LOGO_DARK_MONO.png"),
    [getFileUri],
  );

  useEffect(() => {
    if (supabase instanceof SupabaseClient) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          router.navigate("/(entry)/(home)" as RelativePathString);
        }
      });
    }
  }, [session, router]);

  return (
    <View className="flex-1 bg-white dark:bg-void pt-20">
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <FlexRow className="h-48">
          <BrandLogo />
        </FlexRow>

        <View className="px-4 flex">
          <SBAuth />
        </View>
        <FlexRow className="absolute dark:bg-indigo-300/80 px-8 w-full justify-between bottom-0 h-12 bg-grei">
          <FlexRow className="gap-4 w-24">
            <View className="opacity-30 dark:opacity-100">
              <Image
                source={{ uri: re_up_logo }}
                className="size-4"
                resizeMode="contain"
              />
            </View>
            <View className="opacity-30 dark:opacity-100">
              <Image
                source={{ uri: fast_logo }}
                className="size-14"
                resizeMode="contain"
              />
            </View>
          </FlexRow>
          <Text className="opacity-40 dark:opacity-100 text-sm font-quick">
            TEST&middot;&middot;BUILD
          </Text>
          <FlexRow className="w-24">
            <View className="flex-1" />
            <Text className="opacity-40 dark:opacity-100 text-sm text-end font-quick">
              v{pkg.version}
            </Text>
          </FlexRow>
        </FlexRow>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignInScreen;
// const getPhoneNumber = async () => {
//   // This primarily works on Android, not iOS
//   if (Platform.OS === "ios") {
//     console.log("iOS does not allow access to phone number via API");
//     return null;
//   }

//   try {
//     // Request READ_PHONE_STATE permission
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
//       {
//         title: "Phone Number Permission",
//         message:
//           "This app needs access to your phone number to provide personalized services.",
//         buttonNeutral: "Ask Me Later",
//         buttonNegative: "Cancel",
//         buttonPositive: "OK",
//       },
//     );

//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       // Try to get the phone number
//       const phoneNumber = Device.brand;

//       // Note: On many devices/carriers this might still return an empty string
//       // even with permission granted
//       if (phoneNumber && phoneNumber !== "") {
//         console.log("Phone number:", phoneNumber);
//         return phoneNumber;
//       } else {
//         console.log("Phone number not available or empty");
//         return null;
//       }
//     } else {
//       console.log("Phone number permission denied");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error getting phone number:", error);
//     return null;
//   }
// };

//
//
// const FBAuth = () => {
//   return (
//     <View>
//     <View style={styles.form}>
//               <FlexRow className="rounded-xl mb-4 px-5 bg-white border border-royal/40">
//                 <Ionicons
//                   name="mail-outline"
//                   size={20}
//                   color="#0F172A"
//                   style={styles.inputIcon}
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Phone number or Email Address"
//                   placeholderTextColor="#bbb"
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   value={deviceNumber ?? email}
//                   onChangeText={setEmail}
//                   className="font-quicksemi text-active"
//                 />
//               </FlexRow>

//               {/* <View style={styles.inputContainer}>
//                 <Ionicons
//                   name="lock-closed-outline"
//                   size={20}
//                   color="#0F172A"
//                   style={styles.inputIcon}
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Password"
//                   placeholderTextColor="#bbb"
//                   secureTextEntry
//                   value={password}
//                   onChangeText={setPassword}
//                   className="font-quicksemi text-royal"
//                 />
//               </View> */}

//               {error ? <HText style={styles.errorText}>{error}</HText> : null}

//               <TouchableOpacity
//                 onPress={handleSkip}
//                 className="h-8 opacity-0 self-end align-middle flex items-start px-2 flex-row"
//               >
//                 <Text className="text-sm text-dark-active tracking-tighter font-quicksemi">
//                   Forgot password?
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 className="bg-dark-active flex flex-row items-center justify-center rounded-2xl h-16"
//                 onPress={handleSignIn}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <ActivityIndicator color="#fff" />
//                 ) : (
//                   <Text className="text-white tracking-tighter font-quickbold">
//                     Sign In
//                   </Text>
//                 )}
//               </TouchableOpacity>
//               <FlexRow className="h-12">
//                 <Text className="text-sm">or</Text>
//               </FlexRow>
//               <TouchableOpacity
//                 className="bg-ghost flex border border-void flex-row items-center justify-center rounded-2xl h-16"
//                 onPress={handleGoogleSignIn}
//                 disabled={isLoading}
//               >
//                 {isGoogleLoading ? (
//                   <ActivityIndicator color="#14141b" />
//                 ) : (
//                   <FlexRow className="gap-x-4">
//                     <Text className="text-royal tracking-tighter font-quickbold">
//                       Continue with Google
//                     </Text>
//                     <Icon name="google" solid color="#222" className="size-6" />
//                   </FlexRow>
//                 )}
//               </TouchableOpacity>
//             </View>

//             <View style={styles.footer}>
//               <Text className="dark:text-chalk/70 text-sm text-royal/80 font-quicksemi mr-2">
//                 Don't have an account?{" "}
//               </Text>
//               <FrBtn onPress={handleSkip}>
//                 <Text className="text-dark-active -tracking-[0.02em] px-1 rounded-md text-sm font-quicksemi">
//                   Sign up
//                 </Text>
//                 <Ionicons
//                   name="arrow-up-outline"
//                   className="size-fit rotate-45"
//                   color="#007AFE"
//                 />
//               </FrBtn>
//             </View>
//     </View>
//   )
// }
