import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { BookCard } from "../../common/BookCard";
import { Spacer } from "../../common/Spacer";
import { BottomModal } from "../../common/BottomModal";
import { useOverlay } from "../../hooks/useOverlay";
import BookForm from "./BookForm";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../common/colors";
import type { Book } from "@mods/entities/book";
import type { ReadingStatus } from "./ReadingStatusSelector";

type Props = {
	books: Book[];
	// BookForm用のprops
	formTitle: string;
	formAuthor: string;
	formTotalPages: string;
	formPublisher: string;
	formThumbnailUrl?: string;
	formBackground: string;
	formReadingStatus: ReadingStatus;
	formTargetCompleteDate: string;
	formCompletedPages: string;
	formTargetPagesPerDay: string;
	onChangeFormTitle: (value: string) => void;
	onChangeFormAuthor: (value: string) => void;
	onChangeFormTotalPages: (value: string) => void;
	onChangeFormPublisher: (value: string) => void;
	onChangeFormBackground: (value: string) => void;
	onFormReadingStatusChange: (status: ReadingStatus) => void;
	onChangeFormTargetCompleteDate: (value: string) => void;
	onFormThumbnailUrlChange: (url: string | undefined) => void;
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
	formThumbnailUrl,
	formBackground,
	formReadingStatus,
	formTargetCompleteDate,
	formCompletedPages,
	formTargetPagesPerDay,
	onChangeFormTitle,
	onChangeFormAuthor,
	onChangeFormTotalPages,
	onChangeFormPublisher,
	onChangeFormBackground,
	onFormReadingStatusChange,
	onChangeFormTargetCompleteDate,
	onFormThumbnailUrlChange,
	onChangeFormCompletedPages,
	onChangeFormTargetPagesPerDay,
	onFormAdd,
}: Props) {
	const modalOverlay = useOverlay();

	console.log("books (デバッグ用):", books);
	console.log("books.length:", books.length);
	if (books.length > 0) {
		console.log("books[0]:", books[0]);
	}

	const handleFormAdd = () => {
		onFormAdd();
		modalOverlay.close();
	};

	return (
		<View className="flex-1">
			<ScrollView className="flex-1">
				<View className="gap-3">
					<Spacer height={30} />
					{books.map((book) => (
						<BookCard key={book.id} book={book} />
					))}
					<Spacer height={24} />
				</View>
			</ScrollView>
			
			{/* 右下のプラスボタン */}
			<Pressable style={styles.fab} onPress={modalOverlay.open}>
				<Ionicons name="add" size={32} color="white" />
			</Pressable>

			{/* BottomModalでBookFormを表示 */}
			<BottomModal overlay={modalOverlay} portalName="book-form" height="full">
				<BookForm
					title={formTitle}
					author={formAuthor}
					totalPages={formTotalPages}
					publisher={formPublisher}
					thumbnailUrl={formThumbnailUrl}
					background={formBackground}
					readingStatus={formReadingStatus}
					targetCompleteDate={formTargetCompleteDate}
					completedPages={formCompletedPages}
					targetPagesPerDay={formTargetPagesPerDay}
					onChangeTitle={onChangeFormTitle}
					onChangeAuthor={onChangeFormAuthor}
					onChangeTotalPages={onChangeFormTotalPages}
					onChangePublisher={onChangeFormPublisher}
					onChangeBackground={onChangeFormBackground}
					onReadingStatusChange={onFormReadingStatusChange}
					onChangeTargetCompleteDate={onChangeFormTargetCompleteDate}
					onThumbnailUrlChange={onFormThumbnailUrlChange}
					onChangeCompletedPages={onChangeFormCompletedPages}
					onChangeTargetPagesPerDay={onChangeFormTargetPagesPerDay}
					onAdd={handleFormAdd}
				/>
			</BottomModal>
		</View>
	);
}

const styles = StyleSheet.create({
	fab: {
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


