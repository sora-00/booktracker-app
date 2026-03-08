import { Slot } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
export default function AuthedLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <View className="flex-1 bg-main">
      <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
        <Slot />
      </SafeAreaView>
      <View className="bg-light" style={{ height: insets.bottom }} />
    </View>
  );
}

