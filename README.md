# Superfast - RN Expo

A superfast app created for FastInsure

## The Stack

- React Native Expo
- TypeScript
- Bun

### Frontend

- Nativewind

### Backend

- Firebase
- Expo SecureStorage

## Prebuild

`bunx expo prebuild`

This will generate Android and iOS project directories.

## Android Release (.apk)

`./gradlew clean`

If no errors, proceed with the release build.

`./gradlew assembleRelease`

## Android Prod Release

`./gradlew bundleRelease`

## Using Keytool on the certificate

Open a terminal and run the keytool utility provided with Java to get the SHA-1 fingerprint of the certificate. You should get both the release and debug certificate fingerprints.

```zsh
# From the root directory

keytool -list -v \
-alias androiddebugkey -keystore ./android/app/debug.keystore
```

## Using Keytool on an APK or AAB

To get the certificate of an application binary:

```zsh
# APK file

keytool -printcert -jarfile app-release.apk

# AAB file
keytool -printcert -jarfile app-release.aab

```

## Using Gradle Signing Report

```zsh
./gradlew signingReport
```

# FIREBASE

## Setup Configuration

### Envs

```env
EXPO_PUBLIC_F_API_KEY=YOUR_API_KEY
EXPO_PUBLIC_F_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
EXPO_PUBLIC_F_PROJECT_ID=YOUR_PROJECT_ID
EXPO_PUBLIC_F_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
EXPO_PUBLIC_F_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
EXPO_PUBLIC_F_APP_ID=YOUR_APP_ID
```

### Options

Get configs from firebase console

## Install Deps

```zsh
bunx expo install firebase @react-native-firebase
```

## iOS

### Add Packages from XCode

Right-click on `<app-workspace>` and select `Add Package Dependencies...`

Then enter package URL `https://github.com/firebase/firebase-ios-sdk`

Dependency rule: `Up to Next Major Version`
Add to Project: `<app-workspace>`

### 🚨IMPORTANT - After Adding Packages, Make sure to apply changes.

_Check for yellow warning symbol in XCode on the top-right_

### Update Podfile

```zsh
# From root directory

bunx pod-install
```
