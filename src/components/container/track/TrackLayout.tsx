import { ScrollView, View } from "react-native";
import { Text } from "@/components/common/Text";
import { ThumbnailMarker } from "./thumbnail/ThumbnailMarker";
import { BookTrackRow } from "./track/BookTrackRow";
import { START_X, END_X, TRACK_WIDTH } from "@/constants/track";
import { Spacer } from "@/components/common/Spacer";
import type { BookWithLogs, Log } from "@/types";

type Props = {
	books: BookWithLogs[];
	onSelectLog: (book: BookWithLogs, log: Log) => void;
};

export function TrackLayout(props: Props) {
	const renderThumbnail = (book: BookWithLogs) => {
		const readPages = Math.min(book.totalPages, Math.max(0, book.readPages));
		const completedRatio = book.totalPages > 0 ? readPages / book.totalPages : 0;
		return (
			<View key={book.id} className="flex-col items-center justify-start">
				<Text size="body1" color="accent" weight="bold">
					{Math.round(completedRatio * 100)}%
				</Text>
				<ThumbnailMarker thumbnailUrl={book.thumbnailUrl} />
				<Spacer height={30} />
			</View>
		);
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View className="flex-row items-start">
				<View>
					{props.books.map((book) => renderThumbnail(book))}
				</View>
				<ScrollView
					horizontal
					nestedScrollEnabled
					showsHorizontalScrollIndicator={false}
					style={{ flex: 1 }}
				>
					<View style={{ width: TRACK_WIDTH }}>
						{props.books.map((book) => (
							<View key={book.id}>
								<BookTrackRow book={book} startX={START_X} endX={END_X} onSelectLog={props.onSelectLog} />
							</View>
						))}
					</View>
				</ScrollView>
			</View>
		</ScrollView>
	);
}
