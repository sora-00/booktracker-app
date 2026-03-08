import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusIconButton } from "@/components/common/StatusIconButton";
import type { Status } from "@/types";

type Props = {
	selectedFilter: Status | undefined;
	onFilterChange: (filter: Status | undefined) => void;
	availableFilters?: (Status | undefined)[];
};

const FILTER_OPTIONS: { value: Status | undefined; icon: keyof typeof Ionicons.glyphMap }[] = [
	{ value: undefined, icon: "book" },
	{ value: "unread", icon: "library" },
	{ value: "reading", icon: "walk" },
	{ value: "completed", icon: "trophy" },
];

export function BookStatusFilter(props: Props) {
	const filtersToShow =
		props.availableFilters ?? FILTER_OPTIONS.map((o) => o.value);
	return (
		<View className="flex-row justify-space-between items-center" style={{ gap: 15 }}>
			{filtersToShow.map((value) => {
				const option = FILTER_OPTIONS.find((o) => o.value === value);
				const icon = option?.icon ?? "book";
				const isSelected = props.selectedFilter === value;
				return (
					<StatusIconButton
						key={value ?? "all"}
						icon={icon}
						size={45}
						isSelected={isSelected}
						onPress={() => props.onFilterChange(value)}
					/>
				);
			})}
		</View>
	);
}
