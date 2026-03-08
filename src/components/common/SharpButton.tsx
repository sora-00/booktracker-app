import { Pressable, StyleProp, ViewStyle, View } from "react-native";
import { Text } from "./Text";

type Props = {
	title: string;
	onPress: () => void;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
};

export function SharpButton(props: Props) {
	const disabled = props.disabled ?? false;
	return (
		<View
			className={`w-full rounded-[10px] py-3 items-center justify-center ${disabled ? "bg-textGray" : "bg-accent"} opacity-100`}
			style={props.style}
		>
			<Pressable
				onPress={props.onPress}
				disabled={disabled}
				style={({ pressed }) => (pressed && !disabled ? { opacity: 0.85 } : undefined)}
			>
				<Text size="body1" color="white" weight="bold">{props.title}</Text>
			</Pressable>
		</View>
	);
}
