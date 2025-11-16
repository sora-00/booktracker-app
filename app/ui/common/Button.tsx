import { Pressable, View } from "react-native";
import { ReactNode } from "react";
import { Text } from "./Text";
import { colors } from "./colors";

type Props = {
  title?: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: ReactNode;
}

export function RoundedButton(props: Props) {
  const hasIcon = Boolean(props.icon);
  const hasTitle = Boolean(props.title);
  
  // titleがあればtitleを優先、なければiconを表示
  const showTitle = hasTitle;
  const showIcon = hasIcon && !hasTitle;
  
  return (
    <View className="w-full"> 
      <Pressable 
        onPress={props.onPress} 
        disabled={props.disabled} 
        className="items-center justify-center py-3 rounded-[24px] w-full"
        style={{ 
          backgroundColor: props.disabled ? colors.main.secondary : colors.main.primary,
          paddingHorizontal: showIcon ? 16 : 24,
        }}
      >
        {showIcon && props.icon}
        {showTitle && (
          <Text size="title1" color="white" weight="bold">{props.title}</Text>
        )}
      </Pressable>
    </View>
	);
};
