"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

interface ConfigCtxValues {
  getFileUri: (filename: string) => string;
}
export const ConfigCtx = createContext<ConfigCtxValues | undefined>(undefined);

export const ConfigCtxProvider = ({ children }: { children: ReactNode }) => {
  const baseUrl = process.env.EXPO_PUBLIC_F_BASE_URL;
  const storageBucket = process.env.EXPO_PUBLIC_F_STORAGEBUCKET;
  const dir = process.env.EXPO_PUBLIC_F_STORAGE_DIR;

  const getFileUri = useCallback(
    (filename: string) =>
      `${baseUrl}/${storageBucket}/${dir}%2F${filename}?alt=media`,
    [baseUrl, storageBucket, dir],
  );
  const value = useMemo(
    () => ({
      getFileUri,
    }),
    [getFileUri],
  );
  return <ConfigCtx value={value}>{children}</ConfigCtx>;
};
// Custom hook to use auth context
export function useConfigCtx() {
  const context = useContext(ConfigCtx);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
