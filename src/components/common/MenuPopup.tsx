import { View, Pressable } from "react-native";
import { Text } from "./Text";
import { Divider } from "./Divider";

type MenuItem = {
	label: string;
	onPress: () => void;
	color?: "black" | "red";
};

type Props = {
	items: MenuItem[];
	onClose?: () => void;
};

export function MenuPopup(props: Props) {
	const handleItemPress = (item: MenuItem) => {
		item.onPress();
		if (props.onClose) props.onClose();
	};

	return (
		<View className="rounded-lg border border-gray-200 shadow-lg bg-white min-w-[120px]">
			{props.items.map((item, index) => (
				<View key={index} className="py-3 px-4">
					<Pressable onPress={() => handleItemPress(item)}>
						<Text size="body1" color={item.color || "black"}>{item.label}</Text>
					</Pressable>
					{index < props.items.length - 1 && <Divider />}
				</View>
			))}
		</View>
	);
}
