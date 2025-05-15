import { View, Text } from "react-native";
// import { LineChart } from 'react-native-chart-kit';

type StatCardProps = {
  hours: number;
  percentChange: number;
  chartData: number[];
  peakPercentage: number;
};

export const StatCard = ({
  hours,
  percentChange,
  chartData,
  peakPercentage,
}: StatCardProps) => {
  return (
    <View className="bg-white dark:bg-hades rounded-2xl p-5 mb-4 shadow-sm">
      <Text className="text-base font-tight mb-4 dark:text-chalk">
        Engagements
      </Text>

      <View className="flex-row justify-between items-start">
        <View>
          <Text className="text-3xl font-spacebold mb-2 dark:text-chalk">
            {hours}
          </Text>
          <View className="flex-row items-center">
            <View className="mr-1">
              <Text className="text-green-500 text-lg">▲</Text>
            </View>
            <Text className="text-lg font-quicksemi text-green-500">
              +{percentChange}% last week
            </Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-xs text-gray-500 absolute top-0 right-8 z-10">
            {peakPercentage}%
          </Text>
          {/* <LineChart
            data={{
              labels: [],
              datasets: [{ data: chartData }],
            }}
            width={120}
            height={60}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(65, 84, 241, ${opacity})`,
              strokeWidth: 2,
              fillShadowGradientFrom: 'rgba(65, 84, 241, 0.2)',
              fillShadowGradientTo: 'rgba(65, 84, 241, 0)',
              propsForDots: {
                r: '4',
                strokeWidth: '0',
                fill: '#4154F1',
              },
            }}
            bezier
            style={{
              marginRight: -15,
              borderRadius: 16,
            }}
            withHorizontalLines={false}
            withVerticalLines={false}
            withDots={false}
            withShadow={false}
            withInnerLines={false}
            withOuterLines={false}
            withHorizontalLabels={false}
            withVerticalLabels={false}
          /> */}
        </View>
      </View>
    </View>
  );
};
