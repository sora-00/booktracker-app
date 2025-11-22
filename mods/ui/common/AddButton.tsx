import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./colors";

type Props = {
	onPress: () => void;
	icon?: keyof typeof Ionicons.glyphMap;
};

export function AddButton({ onPress, icon = "add" }: Props) {
	return (
		<Pressable style={styles.addButton} onPress={onPress}>
			<Ionicons name={icon} size={32} color="white" />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	addButton: {
		position: "absolute",
		bottom: 24,
		right: 10,
		width: 64,
		height: 64,
		borderRadius: 32,
		backgroundColor: colors.main.primary,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});

