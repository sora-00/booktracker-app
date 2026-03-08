import { useEffect } from "react";
import { useBooks } from "@/hooks/useBooks";
import { useLogs } from "@/hooks/useLogs";
import BookShelf from "@/components/container/bookshelf/BookShelf";
import { Container } from "@/components/common/Container";
import { useBookForm } from "@/hooks/useBookForm";
import { useBookDetailModal } from "@/hooks/useBookDetailModal";
import { useBookFormSubmit } from "@/hooks/useBookFormSubmit";
import { BookDetailModal } from "@/components/container/bookshelf/BookDetailModal";

export default function BookshelfScreen() {
	const { books: displayBooks, selectedFilter, setSelectedFilter, getBooks, addBook, removeBook, updateBook } = useBooks();
	const { logs: displayLogs, getLogs, removeLog, updateLog } = useLogs();
	const bookForm = useBookForm();
	const { handleFormAdd } = useBookFormSubmit(bookForm, addBook);
	const bookDetail = useBookDetailModal({
		logs: displayLogs,
		updateBook,
		removeLog,
		updateLog,
	});

	useEffect(() => {
		getBooks();
		getLogs();
	}, [getBooks, getLogs]);

	return (
		<Container>
			<BookShelf
				books={displayBooks}
				selectedFilter={selectedFilter}
				onFilterChange={setSelectedFilter}
				formTitle={bookForm.title}
				formAuthor={bookForm.author}
				formTotalPages={bookForm.totalPages}
				formPublisher={bookForm.publisher}
				formEncounterNote={bookForm.encounterNote}
				formThumbnailUrl={bookForm.thumbnailUrl}
				formReadingStatus={bookForm.readingStatus}
				formTargetCompleteDate={bookForm.targetCompleteDate}
				formReadPages={bookForm.readPages}
				formTargetPagesPerDay={bookForm.targetPagesPerDay}
				formResetTrigger={bookForm.resetTrigger}
				onChangeFormTitle={bookForm.setTitle}
				onChangeFormAuthor={bookForm.setAuthor}
				onChangeFormTotalPages={bookForm.setTotalPages}
				onChangeFormPublisher={bookForm.setPublisher}
				onChangeFormEncounterNote={bookForm.setEncounterNote}
				onFormThumbnailUrlChange={bookForm.setThumbnailUrl}
				onFormThumbnailUploadStateChange={bookForm.handleThumbnailUploadStateChange}
				onFormReadingStatusChange={bookForm.setReadingStatus}
				onChangeFormTargetCompleteDate={bookForm.setTargetCompleteDate}
				onChangeFormReadPages={bookForm.setReadPages}
				onChangeFormTargetPagesPerDay={bookForm.setTargetPagesPerDay}
				onFormAdd={handleFormAdd}
				onDeleteBook={removeBook}
				onSelectBook={bookDetail.openBookDetail}
			/>
			{bookDetail.selectedBook && (
				<BookDetailModal
					overlay={bookDetail.bookDetailOverlay}
					book={bookDetail.selectedBook}
					logs={displayLogs}
					onClose={bookDetail.closeBookDetail}
					onUpdateBookEncounterNote={bookDetail.handleUpdateBookEncounterNote}
					onAddLog={bookDetail.handleAddLog}
					onDeleteLog={bookDetail.handleDeleteLog}
					onUpdateLogMemo={bookDetail.handleUpdateLogMemo}
				/>
			)}
		</Container>
	);
}
