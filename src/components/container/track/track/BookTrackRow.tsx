import { View } from "react-native";
import type { Book, BookWithLogs, Log } from "@/types";
import { ProgressTrack } from "./ProgressTrack";
import { StartMarker } from "./StartMarker";
import { THUMBNAIL_SIZE_HEIGHT, TRACK_WIDTH } from "@/constants/track";
import { formatDateSlash } from "@/utils/date";
import { LogMarker } from "./LogMarker";
import { GoalMarker } from "./GoalMarker";
import { Spacer } from "@/components/common/Spacer";

type Props = {
	book: BookWithLogs;
	startX: number;
	endX: number;
	onSelectLog: (book: BookWithLogs, log: Log) => void;
};

export function BookTrackRow(props: Props) {
	const getXFromPage = (b: Book, page: number): number => {
		if (b.totalPages === 0) return props.startX;
		const progress = (page / b.totalPages) * 100;
		return props.startX + ((props.endX - props.startX) * progress) / 100;
	};

	const logsSorted = [...props.book.logs].sort((a, b) => a.endPage - b.endPage);
	const readPages = Math.min(props.book.totalPages, Math.max(0, props.book.readPages));
	const completedRatio = props.book.totalPages > 0 ? readPages / props.book.totalPages : 0;
	const startDate = props.book.createdAt.split("T")[0];
	const goalDate = props.book.completedDate ?? props.book.targetCompleteDate;
	const trackTop = THUMBNAIL_SIZE_HEIGHT / 2 + 20;

	return (
		<>
			<Spacer height={20} />
			<View className="relative" style={{ width: TRACK_WIDTH, height: THUMBNAIL_SIZE_HEIGHT }}>
				<ProgressTrack completedRatio={completedRatio} startX={props.startX} endX={props.endX} top={trackTop} />
				<StartMarker startX={props.startX} top={trackTop} date={formatDateSlash(startDate)} />
				{logsSorted.map((log) => {
					const flagX = getXFromPage(props.book, log.endPage);
					return (
						<LogMarker
							key={log.id}
							x={flagX}
							date={formatDateSlash(log.readDate)}
							onPress={() => props.onSelectLog(props.book, log)}
						/>
					);
				})}
				<GoalMarker x={props.endX} top={trackTop} date={formatDateSlash(goalDate)} />
			</View>
			<Spacer height={31} />
		</>
	);
}
