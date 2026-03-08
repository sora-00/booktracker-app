import { View } from "react-native";
import { Text } from "@/components/common/Text";
import { Spacer } from "@/components/common/Spacer";
import { StatusIconButton } from "@/components/common/StatusIconButton";
import { TrackLayout } from "./TrackLayout";
import type { TrackStatus, BookWithLogs, Log } from "@/types";

type Props = {
	books: BookWithLogs[];
	statusFilter: TrackStatus;
	onChangeStatusFilter: (status: TrackStatus) => void;
	emptyMessage: string;
	onSelectLog: (book: BookWithLogs, log: Log) => void;
};

export function Track(props: Props) {
	return (
		<View className="flex-1 w-full bg-main">
			<Spacer height={10} />
			<View className="px-5">
				<View className="flex-row items-center" style={{ gap: 20 }}>
					<StatusIconButton
						icon="walk"
						size={45}
						isSelected={props.statusFilter === "reading"}
						label="読書中"
						onPress={() => props.onChangeStatusFilter("reading")}
					/>
					<StatusIconButton
						icon="trophy"
						size={45}
						isSelected={props.statusFilter === "completed"}
						label="読破済み"
						onPress={() => props.onChangeStatusFilter("completed")}
					/>
				</View>
			</View>
			<Spacer height={20} />
			<View className="flex-1 w-full">
				{props.books.length === 0 ? (
					<View className="flex-1 items-center justify-center px-6">
						<Text size="body1" color="gray">{props.emptyMessage}</Text>
					</View>
				) : (
					<TrackLayout books={props.books} onSelectLog={props.onSelectLog} />
				)}
			</View>
		</View>
	);
}
