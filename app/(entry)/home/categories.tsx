import { HText } from "@/components/HyperText";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";

export const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = [
    { id: 1, name: "Auto", icon: "grid" },
    { id: 2, name: "Personal", icon: "laptop" },
    { id: 3, name: "Fire", icon: "shirt" },
    { id: 4, name: "Health", icon: "home" },
    { id: 5, name: "Life", icon: "map-pin" },
  ] as Array<{ id: number; name: string; icon: string }>;

  return (
    <View className="items-center pt-2 flex flex-row bg-transparent">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 8, gap: 12 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            className="h-20 w-24 flex flex-col items-center border-[0.33px] border-gray-500 justify-center rounded-3xl bg-white"
            onPress={() => setActiveCategory("All")}
          >
            {/* <Feather
              name={category.icon}
              size={24}
              color={activeCategory === "All" ? "#0F172A" : "#64748B"}
              /> */}
            <HText
              variant="tiny"
              weight="medium"
              className="tracking-tighter text-blue-500 font-medium"
            >
              {category.name}
            </HText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
