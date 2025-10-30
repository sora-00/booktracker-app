import { Pressable, Text } from "react-native";
import { ReactNode } from "react";

type ButtonProps = {
  title: string;
  children?: ReactNode;
  onPress: () => void;
  disabled?: boolean;
};

export const Button = ({ title, children, onPress, disabled }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`bg-gray-900 py-3 rounded-lg items-center ${disabled ? 'bg-gray-400' : ''}`}
    >
      <Text className="text-white font-bold text-base">{children ?? title}</Text>
    </Pressable>
  );
};


