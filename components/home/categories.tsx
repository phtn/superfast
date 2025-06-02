import { SText } from "@/components/FontScaling";
import { FlexCol } from "@/components/ui/FlexCol";
import { FlexRow } from "@/components/ui/FlexRow";
import { Colors } from "@/constants/Colors";
import { clsx } from "clsx";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Animated, { ZoomInEasyDown } from "react-native-reanimated";
import { Icon } from "../icons";
import { IconName } from "../icons/types";

interface ICategory {
  id: number;
  name: string;
  description?: string;
  subtext?: string;
  icon: IconName;
  path?: string;
  active?: boolean;
}
interface CategoryProps {
  isDark: boolean;
  activeCategory: number;
  setActiveCategory: Dispatch<SetStateAction<number>>;
}
export const Categories = ({
  isDark,
  activeCategory,
  setActiveCategory,
}: CategoryProps) => {
  const categories = useMemo(
    () =>
      [
        { id: 1, name: "Car", icon: "tesla" },
        { id: 2, name: "Personal", icon: "patient" },
        { id: 3, name: "Fire", icon: "fire" },
        { id: 4, name: "Health", icon: "wellness" },
        { id: 5, name: "Life", icon: "shield-keyhole" },
        { id: 6, name: "Phone", icon: "mobile-shield" },
      ] as ICategory[],
    [],
  );

  const ic = useMemo(
    () =>
      isDark
        ? { active: Colors.dark.text, inactive: Colors.light.ga }
        : { active: Colors.dark.text, inactive: Colors.light.text },
    [isDark],
  );

  const handleSetCategory = useCallback(
    (id: number) => () => {
      setActiveCategory(id);
    },
    [setActiveCategory],
  );

  return (
    <View className="items-center pt-2 flex flex-row">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="scroll-smooth"
        contentContainerStyle={{
          paddingVertical: 36,
          paddingHorizontal: 20,
          gap: 24,
        }}
      >
        {categories.map((category, index) => (
          <Animated.View
            entering={ZoomInEasyDown.delay(index * 50).duration(300)}
            key={category.id}
          >
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
                <Icon
                  name={category.icon}
                  solid={category.name === "Car"}
                  color={
                    activeCategory === category.id ? ic.active : ic.inactive
                  }
                  size={category.name === "Car" ? 32 : 24}
                />
              </FlexRow>
              <SText
                className={clsx(
                  `tracking-tighter text-base text-dark-active font-quicksemi ${activeCategory === category.id ? "text-dark-active dark:text-hyper-active" : "text-void/80 dark:text-chalk/80"}`,
                )}
              >
                {category.name}
              </SText>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

interface UserCategoryProps {
  isDark: boolean;
}

export const UserCategories = ({ isDark }: UserCategoryProps) => {
  const [activeCategory, setActiveCategory] = useState(1);
  const categories = useMemo(
    () =>
      [
        { id: 1, name: "Car", icon: "tesla" },
        { id: 2, name: "Personal", icon: "patient" },
        { id: 3, name: "Fire", icon: "fire" },
        { id: 4, name: "Health", icon: "wellness" },
        { id: 5, name: "Life", icon: "shield-keyhole" },
        { id: 6, name: "Phone", icon: "mobile-shield" },
      ] as ICategory[],
    [],
  );
  const handleSetCategory = useCallback(
    (id: number) => () => {
      setActiveCategory(id);
    },
    [],
  );

  const ic = useMemo(
    () =>
      isDark
        ? { active: Colors.dark.active, inactive: Colors.dark.ga }
        : { active: Colors.dark.text, inactive: Colors.light.text },
    [isDark],
  );
  return (
    <FlexCol>
      <View className="items-center pt-2 flex flex-row">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="scroll-smooth"
          contentContainerStyle={{
            gap: 18,
            width: "100%",
            display: "flex",
            alignItems: "center",
            paddingVertical: 24,
            paddingHorizontal: 16,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {categories.map((category) => (
            <Animated.View key={category.id}>
              <TouchableOpacity
                activeOpacity={0.8}
                className={clsx(
                  `size-16 flex flex-col gap-y-2 items-center justify-center rounded-2xl`,
                )}
                onPress={handleSetCategory(category.id)}
              >
                <FlexRow
                  className={clsx(
                    `rounded-2xl w-[3.25rem] h-12 border-[0.33px] ${activeCategory === category.id ? "bg-royal dark:bg-white border-royal" : "bg-white dark:bg-chalk/10 border-royal/5"}`,
                  )}
                >
                  <Icon
                    name={category.icon}
                    solid={category.name === "Car"}
                    color={
                      activeCategory === category.id ? ic.active : ic.inactive
                    }
                    size={category.name === "Car" ? 32 : 24}
                  />
                </FlexRow>
                <SText
                  className={clsx(
                    `tracking-tighter text-base dark:chalk text-active font-quicksemi ${activeCategory === category.id ? "text-royal dark:text-white" : "text-void/80 dark:text-chalk/80"}`,
                  )}
                >
                  {category.name}
                </SText>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      </View>
      <View className="w-full px-8">
        {/* <Animated.View
          style={{ transform: [{ scaleX: scrollValue }] }}
          className="h-1 w-full drop-shadow-sm shadow-royal rounded-full bg-void/5 dark:bg-chalk/5"
        /> */}
      </View>
    </FlexCol>
  );
};
