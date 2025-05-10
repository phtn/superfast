import React, { FC, memo, ReactNode, useCallback, useMemo } from "react";
import { View } from "react-native";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { type ContentStyle, FlashList } from "@shopify/flash-list";

// Helper to combine styles (replacement for cn utility)
const combineStyles = (...styles: any[]) => {
  return Object.assign({}, ...styles.filter(Boolean));
};

type StyleProp = object | object[] | undefined;

interface HyperListProps<T> {
  keyId?: keyof T;
  component: FC<T>;
  data: T[] | undefined;
  containerStyle?: StyleProp;
  contentContainerStyle?: ContentStyle;
  itemStyle?: StyleProp;
  reversed?: boolean;
  orderBy?: keyof T;
  max?: number;
  children?: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  disableAnimation?: boolean;
}

export const ListComponent = <T extends object>(props: HyperListProps<T>) => {
  const {
    component: Item,
    containerStyle,
    contentContainerStyle = { paddingHorizontal: 12 },
    children,
    data,
    delay = 0,
    direction = "down",
    itemStyle,
    keyId,
    max = 15,
    orderBy = "updated_at",
    reversed = false,
    disableAnimation = false,
  } = props;

  const baseContainerStyle = useMemo(
    () => combineStyles("h-24", containerStyle),
    [containerStyle],
  );

  const baseItemStyle = useMemo(() => combineStyles(itemStyle), [itemStyle]);

  const getInitialValue = useCallback(() => {
    switch (direction) {
      case "up":
        return 10;
      case "down":
        return -10;
      case "left":
        return 10;
      case "right":
        return -10;
      default:
        return -10;
    }
  }, [direction]);

  const slicedData = useMemo(
    () => (reversed ? data?.slice(0, max).reverse() : data?.slice(0, max)),
    [data, max, reversed],
  );

  const sortFn = useCallback(
    (a: T, b: T) => {
      if (orderBy in b && orderBy in a) {
        return Number(b[orderBy as keyof T]) - Number(a[orderBy as keyof T]);
      }
      return 0;
    },
    [orderBy],
  );

  const sortedData = useMemo(() => {
    return slicedData?.sort(sortFn) ?? [];
  }, [slicedData, sortFn]);

  const opacity = useSharedValue(disableAnimation ? 1 : 0);
  const translation = useSharedValue(disableAnimation ? 0 : getInitialValue());

  // Create reanimated animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform:
        direction === "left" || direction === "right"
          ? [{ translateX: translation.value }]
          : [{ translateY: translation.value }],
    };
  });

  const renderItem = useCallback(
    ({ item, index }: { item: T; index: number }) => {
      const key = keyId && keyId in item ? String(item[keyId]) : String(index);

      // Start animations with delay based on index
      const animationDelay = index * 40 + delay;

      opacity.value = disableAnimation
        ? 1
        : withDelay(animationDelay, withTiming(1, { duration: 300 }));

      translation.value = disableAnimation
        ? 0
        : withDelay(animationDelay, withTiming(0, { duration: 300 }));

      return (
        <Animated.View key={key} style={[baseItemStyle, animatedStyle]}>
          <Item {...item} />
        </Animated.View>
      );
    },
    [],
  );

  const keyExtractor = useCallback(
    (item: T, index: number) => {
      return keyId && keyId in item ? String(item[keyId]) : String(index);
    },
    [keyId],
  );

  return (
    <View className="h-80">
      {children}
      <FlashList
        data={sortedData}
        scrollEnabled={false}
        estimatedItemSize={50}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={contentContainerStyle}
      />
    </View>
  );
};

export const HyperList = memo(ListComponent) as typeof ListComponent;
