import { ClassName } from "@/types";
import { type ContentStyle, FlashList } from "@shopify/flash-list";
import { clsx } from "clsx";
import React, { FC, memo, ReactNode, useCallback, useMemo } from "react";
import { View } from "react-native";
import Animated, {
  BaseAnimationBuilder,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";

interface HyperListProps<T> {
  keyId?: keyof T;
  component: FC<T>;
  data: T[] | undefined;
  containerStyle?: ClassName;
  contentContainerStyle?: ContentStyle;
  itemStyle?: ClassName;
  reversed?: boolean;
  orderBy?: keyof T;
  max?: number;
  children?: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  disableAnimation?: boolean;
  horizontal?: boolean;
}

export const ListComponent = <T extends object>(props: HyperListProps<T>) => {
  const {
    component: Item,
    containerStyle,
    contentContainerStyle = { paddingHorizontal: 12 },
    data,
    delay = 0,
    direction = "down",
    itemStyle,
    keyId,
    max = 15,
    orderBy = "updated_at",
    reversed = false,
    disableAnimation = false,
    horizontal = false,
  } = props;

  const baseContainerStyle = useMemo(
    () => clsx(`h-80 ${containerStyle}`),
    [containerStyle],
  );

  const baseItemStyle = useMemo(() => `${itemStyle}`, [itemStyle]);

  const enterAnimation = useCallback(
    (index: number): BaseAnimationBuilder | undefined => {
      const stagger = (index + 1) * 80 + delay;
      const animations = {
        up: FadeInDown.delay(stagger).duration(300),
        down: FadeInUp.delay(stagger).duration(300),
        left: FadeInRight.delay(stagger).duration(300),
        right: FadeInLeft.delay(stagger).duration(300),
      } as Record<string, BaseAnimationBuilder | undefined>;

      return disableAnimation ? undefined : animations[direction];
    },
    [delay, direction, disableAnimation],
  );

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

  const renderItem = useCallback(
    ({ item, index }: { item: T; index: number }) => {
      const key = keyId && keyId in item ? String(item[keyId]) : String(index);

      return (
        <Animated.View
          key={key}
          className={baseItemStyle}
          entering={enterAnimation(index)}
        >
          <Item {...item} />
        </Animated.View>
      );
    },
    [enterAnimation, baseItemStyle, Item, keyId],
  );

  const keyExtractor = useCallback(
    (item: T, index: number) => {
      return keyId && keyId in item ? String(item[keyId]) : String(index);
    },
    [keyId],
  );

  return (
    <View className={baseContainerStyle}>
      <FlashList
        data={sortedData}
        scrollEnabled={false}
        estimatedItemSize={12}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        horizontal={horizontal}
      />
    </View>
  );
};

export const HyperList = memo(ListComponent) as typeof ListComponent;
