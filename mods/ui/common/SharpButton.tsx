import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Text } from "./Text";
import { colors } from "./colors";

type Props = {
	title: string;
	onPress: () => void;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
};

export function SharpButton({ title, onPress, disabled = false, style }: Props) {
	return (
		<Pressable
			onPress={onPress}
			disabled={disabled}
			style={({ pressed }) => [
				styles.button,
				disabled && styles.buttonDisabled,
				pressed && !disabled && styles.buttonPressed,
				style,
			]}
		>
			<Text size="body1" color="white" weight="bold">
				{title}
			</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		width: "100%",
		borderRadius: 10,
		backgroundColor: colors.main.accent,
		paddingVertical: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonDisabled: {
		backgroundColor: colors.text.gray,
	},
	buttonPressed: {
		opacity: 0.85,
	},
});

