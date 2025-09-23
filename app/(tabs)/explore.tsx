import ChatFloatingButton from "@/components/ChatFloatingButton";
import Search from "@/components/Search";
import { Card, FeatureCard } from "@/components/ui/Cards";
import Filters from "@/components/ui/Filters";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={[1, 2]}
        renderItem={({ item }) => <Card />}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex-gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={images.avatar}
                  className="w-20 h-20 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-dark-200">
                    Good Afternoon
                  </Text>
                  <Text className="text-base font-rubik-medium text-dark-400">
                    Comfortinoe
                  </Text>
                </View>
              </View>
              <Image
                source={icons.bell}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </View>
            <Search />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-semibold text-dark-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-medium text-primary-400">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <View className="flex flex-row gap-5 mt-5">
                <FeatureCard />
                <FeatureCard />
              </View> */}
              <FlatList
                data={[1, 2, 3]}
                renderItem={({ item }) => <FeatureCard />}
                keyExtractor={(item) => item.toString()}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5 mt-5"
              />
            </View>
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-semibold text-dark-300">
                Our Recommendations
              </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-medium text-primary-400">
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <Filters />
            <View className="flex flex-row gap-5 mt-0.5">
              <Card />
              <Card />
            </View>
          </View>
        }
      />
      <ChatFloatingButton />
    </SafeAreaView>
  );
}
