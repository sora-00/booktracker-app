import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@ui/common/colors";
import { Text } from "@ui/common/Text";
import { Spacer } from "@ui/common/Spacer";
import type { Status } from "@mods/entities/status";

type Props = {
	status: Status;
	onStatusChange: (status: Status) => void;
};

const statusConfig: Record<Status, { icon: keyof typeof Ionicons.glyphMap; label: string }> = {
	unread: { icon: "library-outline", label: "未読" },
	reading: { icon: "walk-outline", label: "読み途中" },
	completed: { icon: "checkmark-outline", label: "読了" },
};

export function ReadingStatusSelector({ status, onStatusChange }: Props) {
	return (
		<View className="w-full">
			<Text size="body1" color="black">読書ステータス</Text>
			<Spacer height={5} />
			<View className="flex flex-row gap-3">
				{(Object.keys(statusConfig) as Status[]).map((statusKey) => {
					const config = statusConfig[statusKey];
					const isSelected = status === statusKey;
					return (
						<Pressable
							key={statusKey}
							onPress={() => onStatusChange(statusKey)}
							className="items-center"
						>
							<View
								className="w-10 h-10 rounded-full justify-center items-center"
								style={{
									backgroundColor: isSelected ? colors.main.primary : colors.input.background,
									borderWidth: isSelected ? 0 : 2,
									borderColor: colors.input.border,
								}}
							>
								<Ionicons
									name={config.icon}
									size={25}
									color={isSelected ? colors.text.white : colors.main.secondary}
								/>
							</View>
							<Spacer height={5} />
							<Text size="body2" color={isSelected ? "black" : "gray"}>
								{config.label}
							</Text>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}

