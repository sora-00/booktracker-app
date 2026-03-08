import { View } from "react-native";
import { ReactNode } from "react";

export const Container = ({ children }: { children: ReactNode }) => {
	return <View className="flex-1 px-5 bg-main">{children}</View>;
};
