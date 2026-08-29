import { Redirect, Slot } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { rEntry } from "@/routes";
export default function AuthedLayout() {
  const { isLoading, isAuthenticated } = useAuth();
  const insets = useSafeAreaInsets();

  if (isLoading) {
    return null;
  }
  if (!isAuthenticated) {
    return <Redirect href={rEntry()} />;
  }

  return (
    <View className="flex-1 bg-main">
      <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
        <Slot />
      </SafeAreaView>
      <View className="bg-light" style={{ height: insets.bottom }} />
    </View>
  );
}

