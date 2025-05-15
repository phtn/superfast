// app/camera/preview.js
import { Icon } from "@/app/_components/icons";
import { FlexRow } from "@/components/ui/FlexRow";
import { Colors } from "@/constants/Colors";
import {
  RelativePathString,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function PhotoPreviewScreen() {
  const { photoUri } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="flex-1 bg-black">
      <TouchableOpacity
        activeOpacity={0.7}
        className="absolute top-16 right-6 z-50"
      >
        <FlexRow>
          <Icon
            name="gallery-wide-bold-duotone"
            solid
            size={32}
            color={Colors.dark.text}
          />
          <Icon name="chev-right" color={Colors.dark.text} />
        </FlexRow>
      </TouchableOpacity>
      <Image
        source={{ uri: photoUri as string }}
        className="flex-1"
        resizeMode="contain"
      />
      <View className="flex-row flex items-center justify-around h-44 absolute bottom-0 w-full px-10">
        <TouchableOpacity
          className="py-2 px-4 rounded-md"
          onPress={() => router.replace("/camera")}
        >
          <Text className="text-chalk text-lg -tracking-[0.05em] font-quickbold">
            Retake
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-dark-active py-3 px-6 rounded-xl"
          onPress={() => {
            // Here you would process/save the photo

            // Return to home tab with the photo URI as a parameter
            router.navigate({
              pathname: "/(ctpl)" as RelativePathString,
              params: { capturedPhoto: photoUri },
            });
          }}
        >
          <Text className="text-chalk text-lg -tracking-[0.05em] font-quickbold">
            Use photo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
