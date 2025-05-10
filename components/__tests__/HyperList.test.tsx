import React from "react";
import { render } from "@testing-library/react-native";
import { HyperList } from "../HyperList";
import { Text } from "react-native";

// Mock react-native-reanimated for testing
jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock"),
);

jest.mock("@shopify/flash-list", () => {
  const React = require("react");
  return {
    FlashList: ({ data, renderItem }) => (
      <>{data.map((item, index) => renderItem({ item, index }))}</>
    ),
  };
});

const data = [
  { id: "1", label: "Item 1" },
  { id: "2", label: "Item 2" },
  { id: "3", label: "Item 3" },
];

const Item = ({ id, label }: { id: string; label: string }) => (
  <Text testID={`item-${id}`}>{label}</Text>
);

describe("HyperList", () => {
  it("renders all items", () => {
    const { getByTestId } = render(
      <HyperList
        key={"hyperlist"}
        data={data}
        component={Item}
        keyId="id"
        disableAnimation
      />,
    );
    data.forEach((item) => {
      expect(getByTestId(`item-${item.id}`)).toBeTruthy();
    });
  });

  it("does not throw errors with animation enabled", () => {
    expect(() => {
      render(
        <HyperList
          data={data}
          component={Item}
          keyId="id"
          disableAnimation={false}
        />,
      );
    }).not.toThrow();
  });

  it("renders nothing if data is empty", () => {
    const { queryByTestId } = render(
      <HyperList data={[]} component={Item} keyId="id" disableAnimation />,
    );
    expect(queryByTestId("item-1")).toBeNull();
  });
});
