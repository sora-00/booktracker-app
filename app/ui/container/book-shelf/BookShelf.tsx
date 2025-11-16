import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { BookCard } from "../../common/BookCard";
import { Spacer } from "../../common/Spacer";
import { BottomModal } from "../../common/BottomModal";
import { useOverlay } from "../../hooks/useOverlay";
import BookForm from "./BookForm";
import { BookStatusFilter } from "./BookStatusFilter";
import type { FilterStatus } from "@mods/types/book-shelf/filter";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../common/colors";
import type { Status } from "@mods/entities/status";
import type { Book } from "@mods/entities";

type Props = {
	books: Book[];
	// BookForm用のprops
	formTitle: string;
	formAuthor: string;
	formTotalPages: string;
	formPublisher: string;
	formBackground: string;
	formThumbnailUrl?: string;
	formReadingStatus: Status;
	formTargetCompleteDate: string;
	formCompletedPages: string;
	formTargetPagesPerDay: string;
	onChangeFormTitle: (value: string) => void;
	onChangeFormAuthor: (value: string) => void;
	onChangeFormTotalPages: (value: string) => void;
	onChangeFormPublisher: (value: string) => void;
	onChangeFormBackground: (value: string) => void;
	onFormThumbnailUrlChange: (url: string | undefined) => void;
	onFormReadingStatusChange: (status: Status) => void;
	onChangeFormTargetCompleteDate: (value: string) => void;
	onChangeFormCompletedPages: (value: string) => void;
	onChangeFormTargetPagesPerDay: (value: string) => void;
	onFormAdd: () => void;
};

export default function BookShelf({
	books,
	formTitle,
	formAuthor,
	formTotalPages,
	formPublisher,
	formBackground,
	formThumbnailUrl,
	formReadingStatus,
	formTargetCompleteDate,
	formCompletedPages,
	formTargetPagesPerDay,
	onChangeFormTitle,
	onChangeFormAuthor,
	onChangeFormTotalPages,
	onChangeFormPublisher,
	onChangeFormBackground,
	onFormThumbnailUrlChange,
	onFormReadingStatusChange,
	onChangeFormTargetCompleteDate,
	onChangeFormCompletedPages,
	onChangeFormTargetPagesPerDay,
	onFormAdd,
}: Props) {
	const modalOverlay = useOverlay();
	const [selectedFilter, setSelectedFilter] = useState<FilterStatus>("all");

	console.log("books (デバッグ用):", books);
	console.log("books.length:", books.length);
	if (books.length > 0) {
		console.log("books[0]:", books[0]);
	}

	const handleFormAdd = () => {
		onFormAdd();
		modalOverlay.close();
	};

	// ステータスに基づいて本をフィルタリング
	const filteredBooks = selectedFilter === "all" 
		? books 
		: books.filter((book) => book.status === selectedFilter);

	return (
		<View className="flex-1 items-center">
			<Spacer height={10} />
			<BookStatusFilter
				selectedFilter={selectedFilter}
				onFilterChange={setSelectedFilter}
			/>
			<Spacer height={20} />
			<ScrollView showsVerticalScrollIndicator={false}>
				{filteredBooks.map((book) => (
					<View key={book.id}>
						<BookCard book={book} />
						<Spacer height={20} />
					</View>
				))}
			</ScrollView>
			
			{/* 右下のプラスボタン */}
			<Pressable style={styles.addButton} onPress={modalOverlay.open}>
				<Ionicons name="add" size={32} color="white" />
			</Pressable>

			{/* BottomModalでBookFormを表示 */}
			<BottomModal overlay={modalOverlay} portalName="book-form" height="full">
				<BookForm
					title={formTitle}
					author={formAuthor}
					totalPages={formTotalPages}
					publisher={formPublisher}
					background={formBackground}
					thumbnailUrl={formThumbnailUrl}
					readingStatus={formReadingStatus}
					targetCompleteDate={formTargetCompleteDate}
					completedPages={formCompletedPages}
					targetPagesPerDay={formTargetPagesPerDay}
					onChangeTitle={onChangeFormTitle}
					onChangeAuthor={onChangeFormAuthor}
					onChangeTotalPages={onChangeFormTotalPages}
					onChangePublisher={onChangeFormPublisher}
					onChangeBackground={onChangeFormBackground}
					onThumbnailUrlChange={onFormThumbnailUrlChange}
					onReadingStatusChange={onFormReadingStatusChange}
					onChangeTargetCompleteDate={onChangeFormTargetCompleteDate}
					onChangeCompletedPages={onChangeFormCompletedPages}
					onChangeTargetPagesPerDay={onChangeFormTargetPagesPerDay}
					onAdd={handleFormAdd}
				/>
			</BottomModal>
		</View>
	);
}

const styles = StyleSheet.create({
	addButton: {
		position: "absolute",
		bottom: 24,
		right: 10,
		width: 64,
		height: 64,
		borderRadius: 32,
		backgroundColor: colors.main.primary,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});


