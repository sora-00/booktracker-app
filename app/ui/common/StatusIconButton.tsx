import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./colors";
import { Text } from "./Text";
import { Spacer } from "./Spacer";

type Props = {
	icon: keyof typeof Ionicons.glyphMap;
	size?: number;
	isSelected: boolean;
	onPress: () => void;
	label?: string;
};

export function StatusIconButton({ icon, size = 40, isSelected, onPress, label }: Props) {
	// アイコンサイズはボタンサイズの約62.5%（40pxのボタンに対して25pxのアイコン）
	const iconSize = size * 0.625;
	
	return (
		<Pressable onPress={onPress} className="items-center">
			<View
				className={`rounded-full justify-center items-center ${isSelected ? "" : "border-2"}`}
				style={{
					width: size,
					height: size,
					backgroundColor: isSelected ? colors.main.primary : colors.input.background,
					borderColor: colors.main.secondary,
				}}
			>
				<Ionicons
					name={icon}
					size={iconSize}
					color={isSelected ? colors.text.white : colors.main.primary}
				/>
			</View>
			{label && (
				<>
					<Spacer height={5} />
					<Text size="body2" color={isSelected ? "black" : "gray"}>
						{label}
					</Text>
				</>
			)}
		</Pressable>
	);
}

