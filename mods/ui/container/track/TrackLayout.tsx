import { ScrollView, View } from "react-native";
import { Text } from "../../common/Text";
import { ThumbnailMarker } from "./thumbnail/ThumbnailMarker";
import { BookTrackRow } from "./track/BookTrackRow";
import { START_X, END_X, TRACK_WIDTH } from "./types/constants";
import { Spacer } from "../../common/Spacer";
import type { BookWithLogs } from "./types";
import type { Log } from "@mods/entities/log";

type TrackLayoutProps = {
	books: BookWithLogs[];
	onSelectLog: (book: BookWithLogs, log: Log) => void;
};

export function TrackLayout({ books, onSelectLog }: TrackLayoutProps) {
	const renderThumbnail = (book: BookWithLogs, index: number) => {
		const completedPages = Math.min(book.totalPages, Math.max(0, book.completedPages));
		const completedRatio = book.totalPages > 0 ? completedPages / book.totalPages : 0;

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
		<ScrollView
			showsVerticalScrollIndicator={false}
		>
			<View className="flex-row items-start">
				<View>
					{books.map((book, index) => renderThumbnail(book, index))}
				</View>

				<ScrollView
					horizontal
					nestedScrollEnabled
					showsHorizontalScrollIndicator={false}
					style={{ flex: 1 }}
				>
					<View style={{ width: TRACK_WIDTH }}>
						{books.map((book) => (
							<View key={book.id}>
								<BookTrackRow book={book} startX={START_X} endX={END_X} onSelectLog={onSelectLog} />
							</View>
						))}
					</View>
				</ScrollView>
			</View>
		</ScrollView>
	);
}

