import { Icon } from "@/components/icons";
import { IconName } from "../../components/icons/types";
import { FlexRow } from "@/components/ui/FlexRow";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { clsx } from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { RelativePathString, router } from "expo-router";
import { useColorScheme } from "nativewind";
import { useCallback, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import Animated, { SlideInUp } from "react-native-reanimated";

export interface ITabItem {
  id: number;
  name: "wallet" | "fast" | "shop" | "chat";
  title?: string;
  icon: IconName;
  active: any;
  color?: string;
  route: string;
}
export const BottomTab = (_: BottomTabBarProps) => {
  const [active, setActive] = useState(1);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const tabs = useMemo(
    () =>
      [
        {
          id: 0,
          name: "fast",
          active: "home-2",
          icon: "home-2",
          route: "fast",
        },
        {
          id: 1,
          name: "shop",
          active: "shop",
          icon: "shop",
          route: "shop",
        },
        {
          id: 2,
          name: "News",
          active: "feed",
          icon: "feed",
          route: "feed",
        },
        {
          id: 3,
          name: "wallet",
          active: "wallet",
          icon: "wallet",
          route: "wallet",
        },
      ] as ITabItem[],
    [],
  );

  const handleTabRoute = useCallback(
    (route: string, index: number) => () => {
      setActive(index);
      router.navigate(`/(entry)/(home)/${route}` as RelativePathString);
    },
    [],
  );

  const getTabColor = useCallback(
    (id: number) => {
      return isDark
        ? id === active
          ? "bg-[#14141B]"
          : ""
        : id === active
          ? "bg-[#E5E7EB] shadow-xl shadow-active/90"
          : "bg-[#14141B]";
    },
    [active, isDark],
  );

  const Tabs = useCallback(() => {
    return tabs?.map((tab, index) => (
      <TouchableOpacity
        className=""
        onPress={handleTabRoute(tab.route, index)}
        key={index}
      >
        <FlexRow
          className={clsx(
            `relative rounded-2xl overflow-hidden size-12`,
            getTabColor(index),
          )}
        >
          <Animated.View
            entering={SlideInUp.delay(600)
              .duration(2000)
              .damping(5)
              .mass(3)
              .withInitialValues({ originY: 144 })}
            className={clsx(
              `absolute -top-36 left-6 ${index !== active && " hidden"}`,
            )}
          >
            <LinearGradient
              start={{ x: 3, y: -1 }}
              colors={["#99f6e4", "#53A9FF", "#53A9FF", "#0A84FF"]}
              className=" w-6 h-28 rotate-[60deg] rounded-full"
            />
          </Animated.View>
          <Animated.View
            entering={SlideInUp.delay(750)
              .duration(1775)
              .damping(5)
              .mass(3)
              .withInitialValues({ originY: 128 })}
            className={clsx(
              `absolute -top-32 w-4 h-36 rotate-[60deg] bg-royal/80 dark:bg-white left-8 ${index !== active && " hidden"}`,
            )}
          />
          <Icon
            name={tab.active}
            size={24}
            color={
              isDark
                ? index === active
                  ? "#E5E7EB"
                  : "#14141B"
                : index === active
                  ? "#14141B"
                  : "#E5E7EB"
            }
            strokeWidth={1.5}
          />
        </FlexRow>
      </TouchableOpacity>
    ));
  }, [active, handleTabRoute, tabs, getTabColor, isDark]);

  return (
    <FlexRow className="w-full px-16">
      <FlexRow
        className={clsx(
          "overflow-hidden px-4 h-20 absolute shadow-lg bottom-0 rounded-[1.8rem] w-full mb-6 justify-between",
          colorScheme === "dark" ? "bg-white" : "bg-void",
        )}
      >
        <Tabs />
      </FlexRow>
    </FlexRow>
  );
};
