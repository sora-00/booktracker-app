import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "./Text";
import { Spacer } from "./Spacer";
import { colors } from "@/constants/colors";

type Props = {
	icon: keyof typeof Ionicons.glyphMap;
	size?: number;
	isSelected: boolean;
	onPress: () => void;
	label?: string;
};

export function StatusIconButton(props: Props) {
	const size = props.size ?? 40;
	const iconSize = size * 0.625;
	return (
		<View className="items-center">
			<Pressable onPress={props.onPress}>
				<View
					className={`rounded-full justify-center items-center ${props.isSelected ? "bg-primary" : "bg-gray border-2 border-light"}`}
					style={{ width: size, height: size }}
				>
					<Ionicons
						name={props.icon}
						size={iconSize}
						color={props.isSelected ? colors.text.white : colors.primary}
					/>
				</View>
				{props.label && (
					<>
						<Spacer height={5} />
						<Text size="body2" color={props.isSelected ? "black" : "gray"}>{props.label}</Text>
					</>
				)}
			</Pressable>
		</View>
	);
}
