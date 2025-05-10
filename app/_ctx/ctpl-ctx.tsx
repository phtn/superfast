"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type IconName } from "../_components/icons/types";

export interface CarType {
  id: string;
  label: string;
  subtext?: string;
  description: string;
  keywords: string[];
  price: number;
  icon: IconName;
}

interface CTPLCtxValues {
  carTypes: CarType[];
  onSelect: (id: string) => void;
  carType: CarType | undefined;
}
export const CTPLCtx = createContext<CTPLCtxValues | undefined>(undefined);

export const CTPLCtxProvider = ({ children }: { children: ReactNode }) => {
  const [carType, setSelectedCarType] = useState<CarType>();

  const carTypes = useMemo(
    () =>
      [
        {
          id: "private",
          label: "Private Cars",
          subtext: "Include jeeps and utility vehicles",
          description: "Private Cars",
          icon: "taxi",
          price: 600,
          keywords: [
            "jeepneys",
            "suv",
            "sedans",
            "utility vans",
            "family vans",
          ],
        },
        {
          id: "lm_trucks",
          label: "Light · Medium Trucks",
          description: "Trucks",
          subtext: "Not over 3,930 kilograms",
          icon: "tow-truck",
          price: 650,
          keywords: ["light trucks", "medium trucks", "elf trucks"],
        },
        {
          id: "hv_trucks",
          label: "Heavy Trucks",
          description: "Heavy Trucks",
          subtext: "Not over 3,930 kilograms",
          icon: "shipping-truck",

          price: 1245,
          keywords: ["heavy trucks", "private buses"],
        },
        {
          id: "motors",
          label: "Motorcycles · Tricycles · Trailers",
          description: "Motors",
          icon: "motorcycle",
          price: 600,
          keywords: ["motorcycles", "tricycles", "trailers"],
        },
      ] as CarType[],
    [],
  );

  const onSelect = useCallback(
    (id: string) => {
      const carType = carTypes.find((t) => t.id === id);
      setSelectedCarType(carType);
    },
    [carTypes],
  );

  const value = useMemo(
    () => ({
      carTypes,
      onSelect,
      carType,
    }),
    [carTypes, onSelect, carType],
  );
  return <CTPLCtx.Provider value={value}>{children}</CTPLCtx.Provider>;
};

// Custom hook to use auth context
export function useCTPLCtx() {
  const context = useContext(CTPLCtx);
  if (context === undefined) {
    throw new Error("useCTPLCtx must be used within an CTPLCtx.Provider");
  }
  return context;
}
