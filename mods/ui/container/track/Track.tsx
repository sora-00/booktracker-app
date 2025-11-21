import { View } from "react-native";
import { Text } from "../../common/Text";
import { Spacer } from "../../common/Spacer";
import { StatusIconButton } from "../../common/StatusIconButton";
import { TrackLayout } from "./TrackLayout";
import type { TrackStatus } from "@mods/types/track";
import { colors } from "../../common/colors";
import type { BookWithLogs } from "./types";
import type { Log } from "@mods/entities/log";

type TrackProps = {
	books: BookWithLogs[];
	statusFilter: TrackStatus;
	onChangeStatusFilter: (status: TrackStatus) => void;
	emptyMessage: string;
	onSelectLog: (book: BookWithLogs, log: Log) => void;
};

export function Track({
	books,
	statusFilter,
	onChangeStatusFilter,
	emptyMessage,
	onSelectLog,
}: TrackProps) {
	return (
		<View className="flex-1 w-full" style={{ backgroundColor: colors.background.screen }}>
			<Spacer height={10} />
			<View className="px-5">
				<View className="flex-row items-center" style={{ gap: 20 }}>
					<StatusIconButton
						icon="walk"
						size={45}
						isSelected={statusFilter === "reading"}
						label="読書中"
						onPress={() => onChangeStatusFilter("reading")}
					/>
					<StatusIconButton
						icon="trophy"
						size={45}
						isSelected={statusFilter === "completed"}
						label="読破済み"
						onPress={() => onChangeStatusFilter("completed")}
					/>
				</View>
			</View>

			<Spacer height={20} />

			<View className="flex-1 w-full">
				{books.length === 0 ? (
					<View className="flex-1 items-center justify-center px-6">
						<Text size="body1" color="gray">
							{emptyMessage}
						</Text>
					</View>
				) : (
					<TrackLayout books={books} onSelectLog={onSelectLog} />
				)}
			</View>
		</View>
	);
}