import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";

import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: any;
  showArrow?: boolean;
}
const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="w-5 h-5" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>
    {showArrow && (
      <Image
        source={icons.rightArrow}
        className="w-5 h-5"
        resizeMode="contain"
      />
    )}
  </TouchableOpacity>
);
const ProfileScreen = () => {
  const handleLogout = async () => {};
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-semibold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>
        <View className="flex-row justify-center flex mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image source={images.avatar} className="w-44 h-44 rounded-full" />
            <TouchableOpacity className="absolute bottom-5 right-0 p-1">
              <Image
                source={icons.edit}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-semibold">Nestlink User</Text>
          </View>
        </View>
        <View className="flex flex-col mt-10 ">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>
        <View className="flex flex-col mt-5 boarder-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>
        <View className="flex flex-col mt-5 boarder-t pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileScreen;
