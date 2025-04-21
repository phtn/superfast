import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const options = {
  apiKey: process.env.EXPO_PUBLIC_F_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_F_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_F_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_F_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_F_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_F_APPID,
  measurementId: process.env.EXPO_PUBLIC_F_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(options);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
