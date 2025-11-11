import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthedLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Slot />
    </SafeAreaView>
  );
}

