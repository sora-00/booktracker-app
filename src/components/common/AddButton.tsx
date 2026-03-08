import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
	onPress: () => void;
	icon: keyof typeof Ionicons.glyphMap;
};

export function AddButton(props: Props) {
	return (
		<View className="absolute bottom-6 right-2.5 w-16 h-16 rounded-full bg-primary items-center justify-center shadow shadow-black/25">
			<Pressable onPress={props.onPress} style={{ flex: 1 }}>
				<View className="w-full h-full items-center justify-center">
					<Ionicons name={props.icon} size={32} color="white" />
				</View>
			</Pressable>
		</View>
	);
}
