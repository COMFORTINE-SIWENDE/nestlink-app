// app/property-registration.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import icons from "@/constants/icons";

// Types for the form data
interface PropertyFormData {
  // Owner Information
  owner: {
    fullName: string;
    idNumber: string;
    email: string;
    phone: string;
    company?: string;
    isAgent: boolean;
  };

  // Property Basic Info
  property: {
    title: string;
    type: string;
    category: string;
    price: number;
    currency: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    areaUnit: string;
    location: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };

  // Pricing Details
  pricing: {
    pricingModel: "monthly" | "daily" | "airbnb" | "custom";
    depositRequired: boolean;
    depositAmount: number;
    depositRefundable: boolean;
    utilitiesIncluded: boolean;
    minStay?: number;
    maxStay?: number;
  };

  // Description & Terms
  description: {
    overview: string;
    terms: string;
    termsFile?: any; // For PDF upload
  };

  // Facilities
  facilities: string[];

  // Media
  media: {
    photos: any[];
    video?: any;
  };
}

const PropertyRegistrationScreen = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PropertyFormData>({
    owner: {
      fullName: "",
      idNumber: "",
      email: "",
      phone: "",
      isAgent: false,
    },
    property: {
      title: "",
      type: "apartment",
      category: "2-bedroom",
      price: 0,
      currency: "Ksh",
      bedrooms: 1,
      bathrooms: 1,
      area: 0,
      areaUnit: "sqft",
      location: "",
      coordinates: { latitude: 0, longitude: 0 },
    },
    pricing: {
      pricingModel: "monthly",
      depositRequired: true,
      depositAmount: 0,
      depositRefundable: true,
      utilitiesIncluded: false,
    },
    description: {
      overview: "",
      terms: "",
    },
    facilities: [],
    media: {
      photos: [],
    },
  });

  const propertyTypes = [
    "Apartment",
    "House",
    "Villa",
    "Studio",
    "Hostel",
    "Hotel",
    "Guesthouse",
    "Townhouse",
    "Condominium",
    "Commercial",
    "Other",
  ];

  const categories = [
    "1-bedroom",
    "2-bedroom",
    "3-bedroom",
    "4+bedroom",
    "Bedsitter",
    "Single-room",
    "Shared-room",
    "Airbnb",
    "Serviced-apartment",
  ];

  const facilitiesList = [
    "WiFi",
    "Parking",
    "Swimming Pool",
    "Gym",
    "Laundry",
    "Security",
    "Elevator",
    "Balcony",
    "Garden",
    "Pet Friendly",
    "Air Conditioning",
    "Heating",
    "Furnished",
    "Kitchen",
    "TV",
    "Hot Water",
  ];

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission required",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      const newPhotos = result.assets.slice(
        0,
        10 - formData.media.photos.length
      );
      setFormData((prev) => ({
        ...prev,
        media: {
          ...prev.media,
          photos: [...prev.media.photos, ...newPhotos],
        },
      }));
    }
  };

  const handleFacilityToggle = (facility: string) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  const handleSubmit = async () => {
    // Validate form data
    if (!validateForm()) {
      return;
    }

    try {
      // Submit data to backend
      Alert.alert(
        "Success!",
        "Your property has been registered successfully and is under review.",
        [{ text: "OK", onPress: () => router.replace("/owner-dashboard") }]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to register property. Please try again.");
    }
  };

  const validateForm = () => {
    // Add comprehensive validation logic here
    return true;
  };

  const renderStepIndicator = () => (
    <View className="flex-row justify-center mb-6">
      {[1, 2, 3, 4, 5, 6].map((step) => (
        <View key={step} className="flex-row items-center">
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${
              step <= currentStep ? "bg-primary-300" : "bg-light-200"
            }`}
          >
            <Text
              className={`font-rubik-semibold ${
                step <= currentStep ? "text-white" : "text-dark-300"
              }`}
            >
              {step}
            </Text>
          </View>
          {step < 6 && (
            <View
              className={`w-12 h-1 mx-2 ${
                step < currentStep ? "bg-primary-300" : "bg-light-200"
              }`}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderOwnerInfo();
      case 2:
        return renderPropertyBasicInfo();
      case 3:
        return renderPricingDetails();
      case 4:
        return renderDescription();
      case 5:
        return renderFacilities();
      case 6:
        return renderMedia();
      default:
        return null;
    }
  };

  const renderOwnerInfo = () => (
    <View className="space-y-4">
      <Text className="text-xl font-rubik-semibold text-dark-400 mb-4">
        Owner Information
      </Text>

      <View>
        <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
          Full Name *
        </Text>
        <TextInput
          value={formData.owner.fullName}
          onChangeText={(text) =>
            setFormData((prev) => ({
              ...prev,
              owner: { ...prev.owner, fullName: text },
            }))
          }
          className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
          placeholder="Enter your full name"
        />
      </View>

      <View>
        <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
          ID/Passport Number *
        </Text>
        <TextInput
          value={formData.owner.idNumber}
          onChangeText={(text) =>
            setFormData((prev) => ({
              ...prev,
              owner: { ...prev.owner, idNumber: text },
            }))
          }
          className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
          placeholder="Enter ID/Passport number"
        />
      </View>

      <View>
        <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
          Email *
        </Text>
        <TextInput
          value={formData.owner.email}
          onChangeText={(text) =>
            setFormData((prev) => ({
              ...prev,
              owner: { ...prev.owner, email: text },
            }))
          }
          keyboardType="email-address"
          className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
          placeholder="Enter your email"
        />
      </View>

      <View>
        <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
          Phone Number *
        </Text>
        <TextInput
          value={formData.owner.phone}
          onChangeText={(text) =>
            setFormData((prev) => ({
              ...prev,
              owner: { ...prev.owner, phone: text },
            }))
          }
          keyboardType="phone-pad"
          className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
          placeholder="Enter phone number"
        />
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-rubik-semibold text-dark-400">
          Are you also the property agent?
        </Text>
        <Switch
          value={formData.owner.isAgent}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              owner: { ...prev.owner, isAgent: value },
            }))
          }
        />
      </View>
    </View>
  );

  const renderPropertyBasicInfo = () => (
    <View className="space-y-4">
      <Text className="text-xl font-rubik-semibold text-dark-400 mb-4">
        Property Basic Information
      </Text>

      <View>
        <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
          Property Title *
        </Text>
        <TextInput
          value={formData.property.title}
          onChangeText={(text) =>
            setFormData((prev) => ({
              ...prev,
              property: { ...prev.property, title: text },
            }))
          }
          className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
          placeholder="e.g., Modern 2-Bedroom Apartment in Westlands"
        />
      </View>

      <View>
        <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
          Property Type *
        </Text>
        <View className="bg-primary-100 border border-primary-200 rounded-lg">
          <Picker
            selectedValue={formData.property.type}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                property: { ...prev.property, type: value },
              }))
            }
          >
            {propertyTypes.map((type) => (
              <Picker.Item key={type} label={type} value={type.toLowerCase()} />
            ))}
          </Picker>
        </View>
      </View>

      <View>
        <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
          Category *
        </Text>
        <View className="bg-primary-100 border border-primary-200 rounded-lg">
          <Picker
            selectedValue={formData.property.category}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                property: { ...prev.property, category: value },
              }))
            }
          >
            {categories.map((category) => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
        </View>
      </View>

      <View className="flex-row space-x-4">
        <View className="flex-1">
          <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
            Bedrooms
          </Text>
          <TextInput
            value={formData.property.bedrooms.toString()}
            onChangeText={(text) =>
              setFormData((prev) => ({
                ...prev,
                property: { ...prev.property, bedrooms: parseInt(text) || 0 },
              }))
            }
            keyboardType="number-pad"
            className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
          />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
            Bathrooms
          </Text>
          <TextInput
            value={formData.property.bathrooms.toString()}
            onChangeText={(text) =>
              setFormData((prev) => ({
                ...prev,
                property: { ...prev.property, bathrooms: parseInt(text) || 0 },
              }))
            }
            keyboardType="number-pad"
            className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
          />
        </View>
      </View>

      <View>
        <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
          Location *
        </Text>
        <TextInput
          value={formData.property.location}
          onChangeText={(text) =>
            setFormData((prev) => ({
              ...prev,
              property: { ...prev.property, location: text },
            }))
          }
          className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
          placeholder="Enter property address"
        />
      </View>
    </View>
  );

  const renderPricingDetails = () => (
    <View className="space-y-4">
      <Text className="text-xl font-rubik-semibold text-dark-400 mb-4">
        Pricing Details
      </Text>

      <View>
        <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
          Pricing Model *
        </Text>
        <View className="bg-primary-100 border border-primary-200 rounded-lg">
          <Picker
            selectedValue={formData.pricing.pricingModel}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                pricing: { ...prev.pricing, pricingModel: value },
              }))
            }
          >
            <Picker.Item label="Monthly Rent" value="monthly" />
            <Picker.Item label="Daily (Hotel-style)" value="daily" />
            <Picker.Item label="Airbnb-style" value="airbnb" />
            <Picker.Item label="Custom" value="custom" />
          </Picker>
        </View>
      </View>

      <View>
        <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
          Price *
        </Text>
        <View className="flex-row items-center">
          <TextInput
            value={formData.property.price.toString()}
            onChangeText={(text) =>
              setFormData((prev) => ({
                ...prev,
                property: { ...prev.property, price: parseInt(text) || 0 },
              }))
            }
            keyboardType="number-pad"
            className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik flex-1"
            placeholder="0"
          />
          <Text className="ml-3 text-base font-rubik-semibold text-dark-400">
            {formData.property.currency}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-rubik-semibold text-dark-400">
          Require Deposit?
        </Text>
        <Switch
          value={formData.pricing.depositRequired}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              pricing: { ...prev.pricing, depositRequired: value },
            }))
          }
        />
      </View>

      {formData.pricing.depositRequired && (
        <>
          <View>
            <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
              Deposit Amount
            </Text>
            <TextInput
              value={formData.pricing.depositAmount.toString()}
              onChangeText={(text) =>
                setFormData((prev) => ({
                  ...prev,
                  pricing: {
                    ...prev.pricing,
                    depositAmount: parseInt(text) || 0,
                  },
                }))
              }
              keyboardType="number-pad"
              className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
              placeholder="Deposit amount"
            />
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-rubik-semibold text-dark-400">
              Deposit Refundable?
            </Text>
            <Switch
              value={formData.pricing.depositRefundable}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  pricing: { ...prev.pricing, depositRefundable: value },
                }))
              }
            />
          </View>
        </>
      )}
    </View>
  );

  const renderDescription = () => (
    <View className="space-y-4">
      <Text className="text-xl font-rubik-semibold text-dark-400 mb-4">
        Description & Terms
      </Text>

      <View>
        <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
          Property Overview * (Max 600 words)
        </Text>
        <TextInput
          value={formData.description.overview}
          onChangeText={(text) =>
            setFormData((prev) => ({
              ...prev,
              description: { ...prev.description, overview: text },
            }))
          }
          multiline
          numberOfLines={6}
          className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
          placeholder="Describe your property in detail..."
        />
        <Text className="text-xs font-rubik text-dark-300 mt-1 text-right">
          {formData.description.overview.length}/3600 characters
        </Text>
      </View>

      <View>
        <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
          Terms & Conditions (Max 1000 characters)
        </Text>
        <TextInput
          value={formData.description.terms}
          onChangeText={(text) =>
            setFormData((prev) => ({
              ...prev,
              description: { ...prev.description, terms: text },
            }))
          }
          multiline
          numberOfLines={4}
          className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
          placeholder="Specify your terms and conditions..."
        />
        <Text className="text-xs font-rubik text-dark-300 mt-1 text-right">
          {formData.description.terms.length}/1000 characters
        </Text>
      </View>
    </View>
  );

  const renderFacilities = () => (
    <View className="space-y-4">
      <Text className="text-xl font-rubik-semibold text-dark-400 mb-4">
        Facilities & Amenities
      </Text>

      <Text className="text-base font-rubik text-dark-300 mb-4">
        Select all facilities available at your property
      </Text>

      <View className="flex-row flex-wrap">
        {facilitiesList.map((facility) => (
          <TouchableOpacity
            key={facility}
            onPress={() => handleFacilityToggle(facility)}
            className={`flex-row items-center p-3 m-1 rounded-lg border ${
              formData.facilities.includes(facility)
                ? "bg-primary-100 border-primary-300"
                : "bg-white border-light-200"
            }`}
          >
            <Text
              className={`font-rubik ${
                formData.facilities.includes(facility)
                  ? "text-primary-300"
                  : "text-dark-300"
              }`}
            >
              {facility}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderMedia = () => (
    <View className="space-y-4">
      <Text className="text-xl font-rubik-semibold text-dark-400 mb-4">
        Property Media
      </Text>

      <Text className="text-base font-rubik text-dark-300 mb-4">
        Upload photos (5-10 images) and optionally a video (max 1 minute)
      </Text>

      <TouchableOpacity
        onPress={handleImagePick}
        className="border-2 border-dashed border-primary-200 rounded-lg p-8 items-center"
      >
        <Image source={icons.upload} className="w-12 h-12 mb-3" />
        <Text className="text-lg font-rubik-semibold text-primary-300">
          Upload Photos
        </Text>
        <Text className="text-sm font-rubik text-dark-300 text-center mt-1">
          Select 5-10 high-quality images of your property
        </Text>
      </TouchableOpacity>

      {formData.media.photos.length > 0 && (
        <View className="mt-4">
          <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
            Selected Photos ({formData.media.photos.length}/10)
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {formData.media.photos.map((photo, index) => (
              <Image
                key={index}
                source={{ uri: photo.uri }}
                className="w-20 h-20 rounded-lg mr-2"
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center mt-5">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Image source={icons.backArrow} className="w-6 h-6" />
          </TouchableOpacity>
          <Text className="text-2xl font-rubik-extrabold text-dark-400 ml-4">
            Property Registration
          </Text>
        </View>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Step Content */}
        {renderStepContent()}

        {/* Spacer */}
        <View className="h-32" />
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-light-200 px-5 py-4">
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={handlePreviousStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg ${
              currentStep === 1 ? "bg-light-200" : "bg-primary-100"
            }`}
          >
            <Text
              className={`font-rubik-semibold ${
                currentStep === 1 ? "text-dark-300" : "text-primary-300"
              }`}
            >
              Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNextStep}
            className="bg-primary-300 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-rubik-semibold">
              {currentStep === 6 ? "Submit Property" : "Next Step"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PropertyRegistrationScreen;
