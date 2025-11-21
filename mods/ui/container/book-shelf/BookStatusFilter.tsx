import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusIconButton } from "../../common/StatusIconButton";
import type { FilterStatus } from "@mods/types/book-shelf/filter";

type Props = {
	selectedFilter: FilterStatus;
	onFilterChange: (filter: FilterStatus) => void;
	availableFilters?: FilterStatus[];
};

const filterConfig: Record<FilterStatus, { icon: keyof typeof Ionicons.glyphMap }> = {
	all: { icon: "book" },
	unread: { icon: "library" },
	reading: { icon: "walk" },
	completed: { icon: "trophy" },
};

export function BookStatusFilter({ selectedFilter, onFilterChange, availableFilters }: Props) {
	const filtersToShow = availableFilters ?? (Object.keys(filterConfig) as FilterStatus[]);
	
	return (
		<View
			className="flex-row justify-space-between items-center"
            style={{ gap: 15 }}
		>
			{filtersToShow.map((filterKey) => {
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