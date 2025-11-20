import { View } from "react-native";
import { colors } from "./colors";

export function Divider() {
	return <View className="w-full h-[1px]" style={{ backgroundColor: colors.main.primary }} />;
}