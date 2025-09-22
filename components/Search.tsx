import icons from "@/constants/icons";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query ?? "");

  // ✅ Debounced function
  const debounceSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debounceSearch(text); // ✅ call debounced function
  };

  return (
    <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-primary-100 border-primary-100 mt-5 py-1">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image source={icons.search} className="w-4 h-4" resizeMode="contain" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for any Property"
          className="text-sm font-rubik text-dark-300 ml-2 flex-1"
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
