import { Slot } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { colors } from "@ui/common/colors";

export default function AuthedLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.background.screen }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <Slot />
      </SafeAreaView>
      {/* 下部のSafeAreaをタブの背景色に合わせる */}
      <View style={{ height: insets.bottom, backgroundColor: colors.main.secondary }} />
    </View>
  );
}

