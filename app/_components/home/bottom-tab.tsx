import { LogoDark, LogoLight } from "@/components/svg/Logo";
import { FlexRow } from "@/components/ui/FlexRow";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useMemo, useState } from "react";
import { TouchableOpacity, StyleSheet, Platform, Text } from "react-native";
import { RelativePathString, router } from "expo-router";
import { FlexCol } from "@/components/ui/FlexCol";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { IconName } from "@/components/icons/types";
import { Icon } from "@/components/icons";
import { clsx } from "clsx";

export interface ITabItem {
  id: number;
  name: "wallet" | "fast" | "shop" | "chat";
  title?: string;
  icon: IconName;
  active: any;
  color?: string;
  route: string;
}
interface BottomTabProps extends BottomTabBarProps {}
export const BottomTab = ({
  state,
  descriptors,
  navigation,
}: BottomTabProps) => {
  const [active, setActive] = useState(1);

  const tabs = useMemo(
    () =>
      [
        {
          id: 0,
          name: "fast",
          active: "home",
          icon: "home",
          route: "fast",
        },
        {
          id: 1,
          name: "shop",
          active: "shop",
          icon: "shop",
          route: "",
        },
        {
          id: 2,
          name: "chat",
          active: "chats",
          icon: "chats",
          route: "chat",
        },
        {
          id: 3,
          name: "wallet",
          active: "wallet",
          icon: "wallet",
          route: "wallet",
        },
      ] as ITabItem[],
    [active],
  );

  const handleTabRoute = useCallback(
    (route: string, index: number) => () => {
      setActive(index);
      router.navigate(`/(entry)/(home)/${route}` as RelativePathString);
    },
    [router],
  );

  const Tabs = useCallback(() => {
    return tabs?.map((tab, index) => (
      <TouchableOpacity
        onPress={handleTabRoute(tab.route, index)}
        key={index}
        style={styles.navItem}
      >
        <FlexRow
          className={clsx("size-14 rounded-[18px]", {
            "bg-void shadow-2xl shadow-active/80": index === active,
          })}
        >
          <Icon
            name={tab.active}
            size={24}
            color={index === active ? "#FFFFFF" : "#14141B"}
            strokeWidth={1.5}
          />
        </FlexRow>
      </TouchableOpacity>
    ));
  }, [active, handleTabRoute, tabs]);

  return (
    <FlexRow className="w-full px-10">
      <FlexRow
        style={{ borderCurve: "continuous" }}
        className="bg-white overflow-hidden px-3 h-20 absolute shadow-lg bottom-0 rounded-[1.8rem] w-full mb-6 justify-between"
      >
        <Tabs />
      </FlexRow>
    </FlexRow>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    paddingBottom: Platform.OS === "ios" ? 30 : 15,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 36,
    borderCurve: "continuous",
    position: "absolute",
    borderTopWidth: 0,
    borderTopColor: "#eeeeee",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  navItemActive: {
    transform: [{ translateY: -20 }],
  },
  activeNavBackground: {
    width: 42,
    height: 42,
    borderRadius: 30,
    backgroundColor: "#0F172A",
    shadowColor: "rgba(0, 122, 254, 1)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 6,
  },
});

interface FastIconProps {
  isActive: boolean;
}

const FastIcon = ({ isActive }: FastIconProps) => {
  return (
    <FlexRow className="h-14 w-14">
      {isActive ? (
        <LogoDark height={56} width={56} />
      ) : (
        <LogoLight height={56} width={56} />
      )}
    </FlexRow>
  );
};

const Tab = () => {
  return null;
  // <FlexCol>
  //   {index === active ? (
  //     <FlexRow className="size-14 bg-void rounded-[18px] shadow-2xl shadow-active/80">
  //       {tab.id === 0 ? (
  //         <FastIcon isActive={false} />
  //       ) : (
  //         <Icon name={tab.active} size={24} color="#FFFFFF" />
  //       )}
  //     </FlexRow>
  //   ) : tab.id === 0 ? (
  //     <FastIcon isActive={index === 0} />
  //   ) : (
  //     <Icon name={tab.active} size={24} color={"#14141b"} />
  //   )}
  // </FlexCol>
};
