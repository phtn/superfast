import { FlexCol } from "@/components/ui/FlexCol";
import { FlexRow } from "@/components/ui/FlexRow";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import { useCallback, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  isDark: boolean;
}
export const Categories = ({ isDark }: Props) => {
  const [activeCategory, setActiveCategory] = useState(1);
  const categories = [
    { id: 1, name: "Car", icon: "car-sport" },
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
          paddingHorizontal: 20,
          gap: 24,
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
                  `rounded-2xl w-14 h-12 ${activeCategory === category.id ? "dark:bg-hyper-active bg-dark-active" : "bg-grei/80 dark:bg-chalk/10"}`,
                )}
              >
                {category.name === "Car" ? (
                  <Ionicons
                    name={category.icon}
                    size={24}
                    color={getCategoryColor(category.id)}
                    className={
                      activeCategory === category.id
                        ? "shadow-lg shadow-hyper-active"
                        : ""
                    }
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
                  `tracking-tighter text-sm text-dark-active font-quicksemi ${activeCategory === category.id ? "text-dark-active dark:text-hyper-active" : "text-void/70 dark:text-chalk/80"}`,
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

interface IUserCategory {
  id: number;
  name: string;
  active: boolean;
  icon: any;
}
interface UserCategoryProps {
  isDark: boolean;
  scrollValue: number;
}

export const UserCategories = ({ isDark, scrollValue }: UserCategoryProps) => {
  const [activeCategory, setActiveCategory] = useState(1);
  const categories = [
    { id: 1, active: true, name: "Auto", icon: "car-sport" },
    { id: 2, active: true, name: "Personal", icon: "user-injured" },
    { id: 3, active: true, name: "Fire", icon: "fire-alt" },
    { id: 4, active: true, name: "Health", icon: "heartbeat" },
    { id: 5, active: true, name: "Life", icon: "star-of-life" },
  ] as Array<IUserCategory>;

  const handleSetCategory = useCallback(
    (id: number) => () => {
      setActiveCategory(id);
    },
    [],
  );

  const getCategoryColor = useCallback(
    (id: number) => {
      const isActiveAndDark = id === activeCategory && isDark;
      return isActiveAndDark
        ? "#0F172A"
        : !isDark && id !== activeCategory
          ? "#0F172A"
          : "#FFFFFF";
    },
    [activeCategory, isDark],
  );
  return (
    <FlexCol>
      <View className="items-center pt-2 flex flex-row">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="scroll-smooth"
          contentContainerStyle={{
            paddingVertical: 24,
            paddingHorizontal: 16,
            gap: 18,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
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
                    `rounded-2xl w-14 h-12 ${activeCategory === category.id ? "bg-royal dark:bg-white" : "bg-white dark:bg-chalk/10"}`,
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
                    `tracking-tighter text-sm dark:chalk text-active font-quicksemi ${activeCategory === category.id ? "text-royal dark:text-white" : "text-void/60 dark:text-chalk/80"}`,
                  )}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      </View>
      <View className="w-full px-8">
        <Animated.View
          style={{ transform: [{ scaleX: scrollValue }] }}
          className="h-1 w-full drop-shadow-sm shadow-royal rounded-full bg-void/5 dark:bg-chalk/5"
        />
      </View>
    </FlexCol>
  );
};
