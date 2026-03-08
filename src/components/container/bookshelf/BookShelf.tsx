import { ScrollView, View } from "react-native";
import { BookCard } from "@/components/common/BookCard";
import { Spacer } from "@/components/common/Spacer";
import { BottomModal } from "@/components/common/BottomModal";
import { useOverlay } from "@/hooks/useOverlay";
import BookForm from "./BookForm";
import { BookStatusFilter } from "./BookStatusFilter";
import { AddButton } from "@/components/common/AddButton";
import { Text } from "@/components/common/Text";
import type { Status, Book } from "@/types";

type Props = {
	books: Book[];
	selectedFilter: Status | undefined;
	onFilterChange: (status: Status | undefined) => void;
	formTitle: string;
	formAuthor: string;
	formTotalPages: string;
	formPublisher: string;
	formEncounterNote: string;
	formThumbnailUrl: string;
	formReadingStatus: Status;
	formTargetCompleteDate: string;
	formReadPages: string;
	formTargetPagesPerDay: string;
	formResetTrigger?: number;
	onChangeFormTitle: (value: string) => void;
	onChangeFormAuthor: (value: string) => void;
	onChangeFormTotalPages: (value: string) => void;
	onChangeFormPublisher: (value: string) => void;
	onChangeFormEncounterNote: (value: string) => void;
	onFormThumbnailUrlChange: (url: string) => void;
	onFormReadingStatusChange: (status: Status) => void;
	onChangeFormTargetCompleteDate: (value: string) => void;
	onChangeFormReadPages: (value: string) => void;
	onChangeFormTargetPagesPerDay: (value: string) => void;
	onFormAdd: () => void;
	onFormThumbnailUploadStateChange?: (hasImage: boolean, isUploading: boolean) => void;
	onDeleteBook?: (bookId: number) => void;
	onSelectBook?: (book: Book) => void;
};

export default function BookShelf(props: Props) {
	const modalOverlay = useOverlay();

	const handleFormAdd = () => {
		props.onFormAdd();
		modalOverlay.close();
	};

	return (
		<View className="flex-1 items-center">
			<Spacer height={10} />
			<BookStatusFilter selectedFilter={props.selectedFilter} onFilterChange={props.onFilterChange} />
			<Spacer height={20} />
			<View className="flex-1 w-full">
				<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
				{props.books.length === 0 ? (
					<View className="flex-1 items-center justify-center py-20 px-6">
						<Text size="body1" color="gray">まだ本が登録されていません</Text>
						<Spacer height={8} />
						<Text size="body2" color="gray">右下の＋から本を追加しましょう</Text>
					</View>
				) : (
					<>
						{props.books.map((book) => (
							<View key={book.id}>
								<BookCard book={book} onDeleteBook={props.onDeleteBook} onPress={props.onSelectBook} />
								<Spacer height={20} />
							</View>
						))}
					</>
				)}
				<Spacer height={100} />
				</ScrollView>
			</View>
			<AddButton onPress={modalOverlay.open} icon="add" />
			<BottomModal overlay={modalOverlay} portalName="book-form" height="full">
				<BookForm
					resetTrigger={props.formResetTrigger}
					title={props.formTitle}
					author={props.formAuthor}
					totalPages={props.formTotalPages}
					publisher={props.formPublisher}
					encounterNote={props.formEncounterNote}
					thumbnailUrl={props.formThumbnailUrl}
					readingStatus={props.formReadingStatus}
					targetCompleteDate={props.formTargetCompleteDate}
					readPages={props.formReadPages}
					targetPagesPerDay={props.formTargetPagesPerDay}
					onChangeTitle={props.onChangeFormTitle}
					onChangeAuthor={props.onChangeFormAuthor}
					onChangeTotalPages={props.onChangeFormTotalPages}
					onChangePublisher={props.onChangeFormPublisher}
					onChangeEncounterNote={props.onChangeFormEncounterNote}
					onThumbnailUrlChange={props.onFormThumbnailUrlChange}
					onReadingStatusChange={props.onFormReadingStatusChange}
					onChangeTargetCompleteDate={props.onChangeFormTargetCompleteDate}
					onChangeReadPages={props.onChangeFormReadPages}
					onChangeTargetPagesPerDay={props.onChangeFormTargetPagesPerDay}
					onAdd={handleFormAdd}
					onThumbnailUploadStateChange={props.onFormThumbnailUploadStateChange}
				/>
			</BottomModal>
		</View>
	);
}
