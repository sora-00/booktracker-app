import { ScrollView, View } from "react-native";
import { useState } from "react";
import { BookCard } from "../../common/BookCard";
import { Spacer } from "../../common/Spacer";
import { BottomModal } from "../../common/BottomModal";
import { useOverlay } from "../../hooks/useOverlay";
import BookForm from "./BookForm";
import { BookStatusFilter } from "./BookStatusFilter";
import { AddButton } from "../../common/AddButton";
import type { FilterStatus } from "@mods/types/book-shelf/filter";
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
	formThumbnailUrl: string;
	formReadingStatus: Status;
	formTargetCompleteDate: string;
	formCompletedPages: string;
	formTargetPagesPerDay: string;
	onChangeFormTitle: (value: string) => void;
	onChangeFormAuthor: (value: string) => void;
	onChangeFormTotalPages: (value: string) => void;
	onChangeFormPublisher: (value: string) => void;
	onChangeFormBackground: (value: string) => void;
	onFormThumbnailUrlChange: (url: string) => void;
	onFormReadingStatusChange: (status: Status) => void;
	onChangeFormTargetCompleteDate: (value: string) => void;
	onChangeFormCompletedPages: (value: string) => void;
	onChangeFormTargetPagesPerDay: (value: string) => void;
	onFormAdd: () => void;
	onDeleteBook?: (bookId: number) => void;
	onSelectBook?: (book: Book) => void;
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
	onDeleteBook,
	onSelectBook,
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
						<BookCard book={book} onDeleteBook={onDeleteBook} onPress={onSelectBook} />
						<Spacer height={20} />
					</View>
				))}
				<Spacer height={100} />
			</ScrollView>
			
			{/* 右下のプラスボタン */}
			<AddButton onPress={modalOverlay.open} />

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
