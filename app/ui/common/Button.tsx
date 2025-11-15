import { Pressable, StyleSheet, View } from "react-native";
import { ReactNode } from "react";
import { Text } from "./Text";
import { colors } from "./colors";

type ButtonProps = {
  title: string;
  children?: ReactNode;
  onPress: () => void;
  disabled?: boolean;
};

export const Button = ({ title, children, onPress, disabled }: ButtonProps) => {
  return (
    <View className=" flex items-center"> 
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[

				{
					backgroundColor: disabled ? colors.main.secondary : colors.main.primary,
					alignItems: "center",
					justifyContent: "center",
          paddingVertical: 12,
          paddingHorizontal: 140,
          borderRadius: 24,
				},
			]}
    >
			<Text size="title1" color="white" weight="bold">
				{children ?? title}
			</Text>
		</Pressable>
    </View>
	);
};
