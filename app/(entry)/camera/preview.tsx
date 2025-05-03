// app/camera/preview.js
import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import {
  RelativePathString,
  useLocalSearchParams,
  useRouter,
} from "expo-router";

export default function PhotoPreviewScreen() {
  const { photoUri } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="flex-1 bg-black">
      <Image
        source={{ uri: photoUri as string }}
        className="flex-1"
        resizeMode="contain"
      />

      <View className="flex-row justify-around py-4">
        <TouchableOpacity
          className="bg-red-500 py-2 px-4 rounded-md"
          onPress={() => router.replace("/camera")}
        >
          <Text className="text-white">Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-green-500 py-2 px-4 rounded-md"
          onPress={() => {
            // Here you would process/save the photo

            // Return to home tab with the photo URI as a parameter
            router.navigate({
              pathname: "/(home)/index" as RelativePathString,
              params: { capturedPhoto: photoUri },
            });
          }}
        >
          <Text className="text-white">Use Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
