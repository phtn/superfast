import { Text } from "react-native";
import { FlexRow } from "./FlexRow";

export const BrandLogo = () => {
  return (
    <FlexRow>
      <Text className="font-courg -tracking-[0.25rem] h-fit text-hyper-active text-4xl -mr-0.5">
        My
      </Text>

      <Text className="font-quickbold -tracking-[0.07em] text-4xl text-royal dark:text-white">
        FastInsure
      </Text>
    </FlexRow>
  );
};
