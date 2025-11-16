import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusIconButton } from "../../common/StatusIconButton";
import type { Status } from "@mods/entities/status";

export type FilterStatus = "all" | Status;

type Props = {
	selectedFilter: FilterStatus;
	onFilterChange: (filter: FilterStatus) => void;
};

const filterConfig: Record<FilterStatus, { icon: keyof typeof Ionicons.glyphMap }> = {
	all: { icon: "book" },
	unread: { icon: "library" },
	reading: { icon: "walk" },
	completed: { icon: "trophy" },
};

export function BookStatusFilter({ selectedFilter, onFilterChange }: Props) {
	return (
		<View
			className="flex-row justify-space-between items-center"
            style={{ gap: 15 }}
		>
			{(Object.keys(filterConfig) as FilterStatus[]).map((filterKey) => {
				const config = filterConfig[filterKey];
				const isSelected = selectedFilter === filterKey;
				return (
					<StatusIconButton
						key={filterKey}
						icon={config.icon}
						size={45}
						isSelected={isSelected}
						onPress={() => onFilterChange(filterKey)}
					/>
				);
			})}
		</View>
	);
}