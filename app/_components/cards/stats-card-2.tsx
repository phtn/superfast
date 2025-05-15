import { View, Text, Image } from "react-native";
// import { CircularProgress } from 'react-native-circular-progress';

type RevenueCardProps = {
  companyName: string;
  category: string;
  revenue: string;
  percentChange: number;
  engagement: number;
  logoUri: string;
};

export const StatCardTwo = ({
  companyName,
  category,
  revenue,
  percentChange,
  engagement,
  logoUri,
}: RevenueCardProps) => {
  return (
    <View className="bg-white dark:bg-hades rounded-2xl p-5 mb-4 shadow-sm">
      <View className="flex-row items-center mb-6">
        <View className="w-10 h-10 rounded-lg bg-orange-300 justify-center items-center mr-3">
          <Image source={{ uri: logoUri }} className="w-6 h-6 tint-white" />
        </View>
        <View className="flex-col">
          <Text className="text-base font-tight dark:text-chalk mb-0.5">
            {companyName}
          </Text>
          <Text className="text-sm font-quick text-ga">{category}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-end">
        <View>
          <View className="flex flex-row gap-3">
            <Text className="text-2xl dark:text-chalk font-space mb-1">
              {revenue}
            </Text>
            <View className="flex-row items-center mb-1">
              <Text className="text-xl font-quicksemi font-medium text-green-500">
                ▲ {percentChange}%
              </Text>
            </View>
          </View>
          <Text className="text-base font-quicksemi text-gray-500 dark:text-chalk/60">
            Earnings this month
          </Text>
        </View>

        <View className="items-center">
          {/* <CircularProgress
            size={50}
            width={4}
            fill={engagement}
            tintColor="#4154F1"
            backgroundColor="#e0e0e0"
            rotation={0}
            lineCap="round"
          >
            {() => (
              <Text className="text-base font-bold text-[#4154F1]">
                {engagement}
              </Text>
            )}
          </CircularProgress> */}
          <Text className="text-base font-quicksemi text-ga dark:text-chalk/60 mt-2">
            {/* Engagement */}
          </Text>
        </View>
      </View>
    </View>
  );
};
