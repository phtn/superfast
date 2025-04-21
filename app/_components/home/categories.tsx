import React, { RefObject, useMemo } from "react";
import { HText } from "@/components/HyperText";
import { FlexRow } from "@/components/ui/FlexRow";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import { useCallback, useState } from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  Animated,
} from "react-native";

interface Props {
  svov?: number;
  isDark: boolean;
}
export const Categories = ({ svov, isDark }: Props) => {
  const [activeCategory, setActiveCategory] = useState(1);
  const categories = [
    { id: 1, name: "Auto", icon: "car-sport" },
    { id: 2, name: "Personal", icon: "user-injured" },
    { id: 3, name: "Fire", icon: "fire-alt" },
    { id: 4, name: "Health", icon: "heartbeat" },
    { id: 5, name: "Life", icon: "star-of-life" },
  ] as Array<{ id: number; name: string; icon: any }>;

  const handleSetCategory = useCallback(
    (id: number) => () => {
      setActiveCategory(id);
    },
    [],
  );

  const getCategoryColor = useCallback(
    (id: number) => {
      return isDark ? "#FFFFFF" : id === activeCategory ? "#FFFFFF" : "#0F172A";
    },
    [activeCategory, isDark],
  );

  return (
    <View className="items-center pt-2 flex flex-row">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="scroll-smooth"
        contentContainerStyle={{
          paddingVertical: 24,
          paddingHorizontal: 18,
          gap: 28,
        }}
      >
        {categories.map((category) => (
          <Animated.View key={category.id}>
            <TouchableOpacity
              className={clsx(
                `size-16 flex flex-col gap-y-2 items-center justify-center rounded-2xl`,
              )}
              onPress={handleSetCategory(category.id)}
            >
              <FlexRow
                className={clsx(
                  `rounded-2xl w-14 h-12 ${activeCategory === category.id ? "dark:bg-dark-active bg-active" : "bg-white dark:bg-chalk/10"}`,
                )}
              >
                {category.name === "Auto" ? (
                  <Ionicons
                    name={category.icon}
                    size={24}
                    color={getCategoryColor(category.id)}
                  />
                ) : (
                  <FontAwesome5
                    name={category.icon}
                    size={18}
                    color={getCategoryColor(category.id)}
                  />
                )}
              </FlexRow>
              <Text
                className={clsx(
                  `tracking-tighter text-sm dark:chalk text-active font-quicksemi ${activeCategory === category.id ? "text-active dark:text-dark-active" : "text-void/70 dark:text-chalk/80"}`,
                )}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};
