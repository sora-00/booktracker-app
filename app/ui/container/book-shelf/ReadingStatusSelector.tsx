import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@ui/common/Text";
import { Spacer } from "@ui/common/Spacer";
import { StatusIconButton } from "../../common/StatusIconButton";
import type { Status } from "@mods/entities/status";

type Props = {
	status: Status;
	onStatusChange: (status: Status) => void;
};

const statusConfig: Record<Status, { icon: keyof typeof Ionicons.glyphMap; label: string }> = {
	unread: { icon: "library", label: "未読" },
	reading: { icon: "walk", label: "読み途中" },
	completed: { icon: "trophy", label: "読了" },
};

export function ReadingStatusSelector({ status, onStatusChange }: Props) {
	return (
		<View className="w-full">
			<Text size="body1" color="black">読書ステータス</Text>
			<Spacer height={5} />
			<View className="flex flex-row items-start" style={{ gap: 8 }}>
				{(Object.keys(statusConfig) as Status[]).map((statusKey) => {
					const config = statusConfig[statusKey];
					const isSelected = status === statusKey;
					return (
						<StatusIconButton
							key={statusKey}
							icon={config.icon}
							size={25}
							isSelected={isSelected}
							onPress={() => onStatusChange(statusKey)}
							label={config.label}
						/>
					);
				})}
			</View>
		</View>
	);
}

