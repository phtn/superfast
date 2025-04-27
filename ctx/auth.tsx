"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { auth, db } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
  type UserCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
// import { getDevice, getToken, setUID, setUsername } from "../actions";
// import { requestPermission } from "@/lib/firebase/messaging/get-token";

interface Devices {
  device: string;
  token: string;
}
interface AuthCtxValues {
  signinWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthCtx = createContext<AuthCtxValues | null>(null);

export const AuthCtxProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        console.log(u);
        // const token = requestPermission();
      }
    });
  }, []);

  const checkIfUserExists = useCallback(async () => {
    if (!user) return;
    // await setUsername(user.displayName ?? user.email!.split("@").shift()!);
    // const device = await getDevice();
    // const token = (await getToken()) ?? "";

    const userDocRef = doc(db, "users", String(user.uid));
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const isDeviceRegistered = userData.devices.some(
        (d: Devices) => d.device === "", // TODO,
      );
      if (isDeviceRegistered) {
        // const token = requestPermission();
      }
    } else {
      // const devices = [{ device, token }];
      const userInfo = getUserInfo(user);

      try {
        await setDoc(userDocRef, {
          ...userInfo,
          // devices,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log("User document created successfully");
      } catch (error) {
        console.error("Error creating user document:", error);
      }
    }
  }, [user]);

  useEffect(() => {
    checkIfUserExists().catch((error) => {
      console.error("Error checking user existence:", error);
    });
  }, [checkIfUserExists]);

  const signinWithGoogle = useCallback(async () => {
    console.log("signinWithGoogle", "triggered");
    signInWithPopup(auth, new GoogleAuthProvider()).then((userCredential) => {
      console.log("USER", userCredential.user);
    });
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out user:", error);
    }
  }, []);

  const value = useMemo(
    () => ({
      signinWithGoogle,
      logout,
    }),
    [signinWithGoogle, logout],
  );
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthCtx);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// const createAuthedUser = async (user: User) => {
//   if (!user) return;

//   const userDocRef = doc(db, "users", user.uid);
//   const devices = [await getDevice()];
//   const userInfo = getUserInfo(user);

//   try {
//     await setDoc(userDocRef, {
//       ...userInfo,
//       devices,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });
//   } catch (error) {
//     console.error("Error creating user document:", error);
//     throw error;
//   }
// };

const getUserInfo = (user: User) => ({
  email: user.email,
  name: user.displayName,
  photoURL: user.photoURL,
  uid: user.uid,
  phone: user.phoneNumber,
});
