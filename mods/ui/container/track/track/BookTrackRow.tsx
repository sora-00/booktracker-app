import { View } from "react-native";
import type { Book } from "@mods/entities/book";
import { ProgressTrack } from "./ProgressTrack";
import { StartMarker } from "./StartMarker";
import { THUMBNAIL_SIZE_HEIGHT, TRACK_WIDTH } from "../types/constants";
import { formatDateSlash } from "../../../utils/date";
import { LogMarker } from "./LogMarker";
import { GoalMarker } from "./GoalMarker";
import { Spacer } from "../../../common/Spacer";
import type { BookWithLogs } from "../types";
import type { Log } from "@mods/entities/log";

type BookTrackRowProps = {
	book: BookWithLogs;
	startX: number;
	endX: number;
	onSelectLog: (book: BookWithLogs, log: Log) => void;
};

export function BookTrackRow({ book, startX, endX, onSelectLog }: BookTrackRowProps) {
	// ページ数からx座標を計算
	const getXFromPage = (book: Book, page: number): number => {
		if (book.totalPages === 0) return startX;
		const progress = (page / book.totalPages) * 100;
		return startX + ((endX - startX) * progress) / 100;
	};

	const logsSorted = [...book.logs].sort((a, b) => a.endPage - b.endPage);
	const completedPages = Math.min(book.totalPages, Math.max(0, book.completedPages));
	const completedRatio = book.totalPages > 0 ? completedPages / book.totalPages : 0;
	const startDate = book.createdAt.split("T")[0];
	const goalDate = book.completedDate ?? book.targetCompleteDate;
	const trackTop = THUMBNAIL_SIZE_HEIGHT / 2 + 20;

	return (
		<>
			<Spacer height={20} />
			<View className="relative" style={{ width: TRACK_WIDTH, height: THUMBNAIL_SIZE_HEIGHT }}>
				<ProgressTrack completedRatio={completedRatio} startX={startX} endX={endX} top={trackTop} />

				<StartMarker startX={startX} top={trackTop} date={formatDateSlash(startDate)} />

				{logsSorted.map((log) => {
					const flagX = getXFromPage(book, log.endPage);
					return (
						<LogMarker
							key={log.id}
							x={flagX}
							date={formatDateSlash(log.readDate)}
							onPress={() => onSelectLog(book, log)}
						/>
					);
				})}

				<GoalMarker x={endX} top={trackTop} date={formatDateSlash(goalDate)} />
			</View>
			<Spacer height={31} />
		</>
	);
}


