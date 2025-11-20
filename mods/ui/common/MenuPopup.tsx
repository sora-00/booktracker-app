import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "./Text";
import { Divider } from "./Divider";
import { colors } from "./colors";

type MenuItem = {
	label: string;
	onPress: () => void;
	color?: "black" | "red";
};

type Props = {
	items: MenuItem[];
	onClose?: () => void;
};

export function MenuPopup({ items, onClose }: Props) {
	const handleItemPress = (item: MenuItem) => {
		item.onPress();
		if (onClose) {
			onClose();
		}
	};

	return (
		<View 
			className="rounded-lg border border-gray-200 shadow-lg"
			style={{ 
				backgroundColor: colors.background.card,
				minWidth: 120,}}
		>
			{items.map((item, index) => (
				<View key={index}>
					<Pressable 
						onPress={() => handleItemPress(item)}
						className="py-3 px-4"
					>
						<Text size="body1" color={item.color || "black"}>
							{item.label}
						</Text>
					</Pressable>
					{index < items.length - 1 && <Divider />}
				</View>
			))}
		</View>
	);
}
