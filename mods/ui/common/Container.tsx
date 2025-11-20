import { View } from "react-native";
import { ReactNode } from "react";
import { colors } from "./colors";

export const Container = ({ children }: { children: ReactNode }) => {
  return (
    <View className="flex-1 px-5" style={{ backgroundColor: colors.background.screen }}>
      {children}
    </View>
  );
};