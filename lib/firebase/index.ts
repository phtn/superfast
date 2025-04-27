import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const apiKey = process.env.EXPO_PUBLIC_F_APIKEY;
const authDomain = process.env.EXPO_PUBLIC_F_AUTHDOMAIN;
const projectId = process.env.EXPO_PUBLIC_F_PROJECTID;
const storageBucket = process.env.EXPO_PUBLIC_F_STORAGEBUCKET;
const messagingSenderId = process.env.EXPO_PUBLIC_F_MESSAGINGSENDERID;
const appId = process.env.EXPO_PUBLIC_F_APPID;
const measurementId = process.env.EXPO_PUBLIC_F_MEASUREMENTID;

const options = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

// Initialize Firebase
const app = initializeApp(options);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
