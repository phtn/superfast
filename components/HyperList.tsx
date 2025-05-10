import React, {
  FC,
  memo,
  ReactNode,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { type ContentStyle, FlashList } from "@shopify/flash-list";
import { ClassName } from "@/types";
import { clsx } from "clsx";

// Helper to combine styles (replacement for cn utility)
const combineStyles = (...styles: any[]) => {
  return Object.assign({}, ...styles.filter(Boolean));
};

type StyleProp = object | object[] | undefined;

interface HyperListProps<T> {
  keyId?: keyof T;
  component: FC<T>;
  data: T[] | undefined;
  containerStyle?: ClassName;
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
    () => clsx("h-80", containerStyle),
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

  // Animated item component to handle per-item animation
  const AnimatedItem = useCallback(
    ({ item, index }: { item: T; index: number }) => {
      const key = keyId && keyId in item ? String(item[keyId]) : String(index);
      const itemOpacity = useSharedValue(disableAnimation ? 1 : 0);
      const itemTranslation = useSharedValue(
        disableAnimation ? 0 : getInitialValue(),
      );

      const itemAnimatedStyle = useAnimatedStyle(() => {
        return {
          opacity: itemOpacity.value,
          transform:
            direction === "left" || direction === "right"
              ? [{ translateX: itemTranslation.value }]
              : [{ translateY: itemTranslation.value }],
        };
      });

      useEffect(() => {
        if (!disableAnimation) {
          const animationDelay = index * 40 + delay;
          itemOpacity.value = withDelay(
            animationDelay,
            withTiming(1, { duration: 300 }),
          );
          itemTranslation.value = withDelay(
            animationDelay,
            withTiming(0, { duration: 300 }),
          );
        }
      }, [disableAnimation, index, delay, direction, getInitialValue]);

      return (
        <Animated.View key={key} style={[baseItemStyle, itemAnimatedStyle]}>
          <Item {...item} />
        </Animated.View>
      );
    },
    [
      baseItemStyle,
      disableAnimation,
      delay,
      direction,
      getInitialValue,
      Item,
      keyId,
    ],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: T; index: number }) => {
      return <AnimatedItem key={index} item={item} index={index} />;
    },
    [AnimatedItem],
  );

  const keyExtractor = useCallback(
    (item: T, index: number) => {
      return keyId && keyId in item ? String(item[keyId]) : String(index);
    },
    [keyId],
  );

  return (
    <View className={baseContainerStyle}>
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
