import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  Camera,
  CameraCapturedPicture,
  CameraType,
  CameraView,
} from "expo-camera";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { Icon } from "@/app/_components/icons";
import { RelativePathString, useRouter } from "expo-router";
import { FlexRow } from "@/components/ui/FlexRow";
import { Colors } from "@/constants/Colors";

type ExtendedCameraCapturedPicture = CameraCapturedPicture & {
  base64?: string;
};

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<CameraType>("back");
  const [capturedImage, setCapturedImage] = useState<
    ExtendedCameraCapturedPicture | undefined
  >();
  const cameraRef = useRef<CameraView | null>(null);

  const router = useRouter();
  const gallery = useCallback(() => {
    const uri = capturedImage?.uri;
    if (uri)
      router.push(`camera/preview/?photoUri=${uri}` as RelativePathString);
  }, [router]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (mounted) {
        console.log("Camera permission status:", status);
        setHasPermission(status === "granted");
      }
    })();

    // Check if there's a saved image on load
    loadSavedImage();
    return () => {
      mounted = false;
    };
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          base64: true,
        });
        setCapturedImage(photo);
        saveImage(photo?.uri, photo?.base64);
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to take picture: " +
            (error instanceof Error ? error.message : "Unknown error"),
        );
      }
    }
  };

  const saveImage = async (
    uri: string | undefined,
    base64Data: string | undefined,
  ) => {
    if (!uri || !base64Data) return;
    try {
      // Save image metadata (URI) and base64 data separately
      await SecureStore.setItemAsync("savedImageUri", uri);
      await SecureStore.setItemAsync("savedImageData", base64Data);
      // Save image dimensions
      if (capturedImage) {
        await SecureStore.setItemAsync(
          "savedImageWidth",
          String(capturedImage.width),
        );
        await SecureStore.setItemAsync(
          "savedImageHeight",
          String(capturedImage.height),
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to save image: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
    }
  };

  const loadSavedImage = async () => {
    try {
      const savedUri = await SecureStore.getItemAsync("savedImageUri");
      const savedWidth = await SecureStore.getItemAsync("savedImageWidth");
      const savedHeight = await SecureStore.getItemAsync("savedImageHeight");
      const savedBase64 = await SecureStore.getItemAsync("savedImageData");

      if (savedUri && savedWidth && savedHeight) {
        setCapturedImage({
          uri: savedUri,
          width: parseInt(savedWidth),
          height: parseInt(savedHeight),
          base64: savedBase64 || undefined,
        });
      }
    } catch (error) {
      console.error("Error loading saved image:", error);
    }
  };

  const resetCamera = async () => {
    setCapturedImage(undefined);
    try {
      // Clean up temporary image data if it exists
      const savedUri = await SecureStore.getItemAsync("savedImageUri");
      if (savedUri) {
        await deleteImage();
      }
    } catch (error) {
      console.error("Error resetting camera:", error);
    }
  };

  const deleteImage = async () => {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync("savedImageUri"),
        SecureStore.deleteItemAsync("savedImageData"),
        SecureStore.deleteItemAsync("savedImageWidth"),
        SecureStore.deleteItemAsync("savedImageHeight"),
      ]);
      setCapturedImage(undefined);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to delete image: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
    }
  };

  const flipCamera = useCallback(() => {
    setType(type === "back" ? "front" : "back");
  }, [type]);

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>
          No access to camera. Please grant permission in your device settings.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {capturedImage ? (
        <View style={styles.previewContainer} className="relative">
          <TouchableOpacity
            onPress={gallery}
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
          <Image source={{ uri: capturedImage.uri }} style={styles.preview} />
          <FlexRow className="justify-between pt-4 px-12">
            <View className="flex-1">
              <Text className="text-chalk text-xl -tracking-[0.05em] font-quick">
                Save image?
              </Text>
            </View>
            <FlexRow className="gap-16">
              <TouchableOpacity onPress={resetCamera}>
                <View className="-rotate-45">
                  <Icon
                    name="plus"
                    size={40}
                    color="red"
                    className="rotate-45"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={resetCamera}>
                <Icon name="new-image" color={Colors.dark.hyper} size={28} />
              </TouchableOpacity>
            </FlexRow>
          </FlexRow>
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <CameraView style={styles.camera} facing={type} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.flipButton} onPress={gallery}>
                <Icon
                  name="gallery-wide-bold-duotone"
                  solid
                  size={32}
                  color="#fff"
                />
              </TouchableOpacity>

              <TouchableOpacity
                className="size-[4.5rem] rounded-full bg-transparent border-4 border-white flex flex-row items-center justify-center"
                onPress={takePicture}
              >
                <View className="size-14 rounded-full bg-ultra-active" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
                <Icon name="camera-rotate" size={32} color="#fff" />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    backgroundColor: "#000",
  },
  cameraContainer: {
    flex: 1,
    height: 200,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    alignItems: "flex-end",
  },
  flipButton: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 15,
    borderRadius: 24,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#53A9FF",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  preview: {
    width: "90%",
    height: "69%",
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 5,
    width: 120,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#FF5252",
  },
});
