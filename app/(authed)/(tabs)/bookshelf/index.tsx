import { useEffect, useState, useCallback } from "react";
import { useBooks } from "@mods/hooks/useBooks";
import { useLogs } from "@mods/hooks/useLogs";
import BookShelf from "@ui/container/book-shelf/BookShelf";
import { Container } from "@ui/common/Container";
import type { Status } from "@mods/entities/status";
import { calculatePagesPerDay } from "@ui/utils/reading";
import { getOneMonthLaterDate } from "@ui/utils/date";
import { mockBooks } from "@mods/types/mock/book";
import { mockLogs } from "@mods/types/mock/log";
import { useOverlay } from "@ui/hooks/useOverlay";
import { BookDetailModal } from "@ui/container/book-shelf/BookDetailModal";
import type { Book } from "@mods/entities/book";

export default function BookshelfScreen() {
	const { books, getBooks, addBook, removeBook, updateBook } = useBooks();
	const { removeLog, updateLog } = useLogs();
	
	// 一時的にモックデータを使用
	const displayBooks = mockBooks;
	const displayLogs = mockLogs;
	
	const [selectedBook, setSelectedBook] = useState<Book | null>(null);
	const bookDetailOverlay = useOverlay();
	
	// BookForm用の状態管理
	const [formTitle, setFormTitle] = useState("");
	const [formAuthor, setFormAuthor] = useState("");
	const [formTotalPages, setFormTotalPages] = useState("");
	const [formPublisher, setFormPublisher] = useState("");
	const [formBackground, setFormBackground] = useState("");
	const [formThumbnailUrl, setFormThumbnailUrl] = useState("");
	const [formReadingStatus, setFormReadingStatus] = useState<Status>("unread");
	const [formTargetCompleteDate, setFormTargetCompleteDate] = useState(getOneMonthLaterDate());
	const [formCompletedPages, setFormCompletedPages] = useState("");
	const [formTargetPagesPerDay, setFormTargetPagesPerDay] = useState("");

	useEffect(() => {
		getBooks();
	}, [getBooks]);

	// 目標読破日が変更されたときに目標ページ数/日を自動計算
	useEffect(() => {
		if (formTargetCompleteDate && formTotalPages) {
			const calculatedPagesPerDay = calculatePagesPerDay(
				formTargetCompleteDate,
				formTotalPages,
				formCompletedPages
			);
			if (calculatedPagesPerDay !== null) {
				setFormTargetPagesPerDay(calculatedPagesPerDay.toString());
			}
		}
	}, [formTargetCompleteDate, formTotalPages, formCompletedPages]);

	const handleFormAdd = useCallback(async () => {
		if (!formTitle.trim() || !formAuthor.trim()) {
			return;
		}

		const errorMessage = await addBook({ 
			title: formTitle.trim(), 
			author: formAuthor.trim(),
			totalPages: formTotalPages ? parseInt(formTotalPages) : 0,
			publisher: formPublisher,
			background: formBackground || "",
			thumbnailUrl: formThumbnailUrl,
			status: formReadingStatus,
			targetCompleteDate: formTargetCompleteDate,
			completedPages: formCompletedPages ? parseInt(formCompletedPages) : 0,
			targetPagesPerDay: formTargetPagesPerDay ? parseInt(formTargetPagesPerDay) : 0,
		});
		if (errorMessage) {
			console.error("追加に失敗しました:", errorMessage);
			return;
		}

		// フォームをリセット
		setFormTitle("");
		setFormAuthor("");
		setFormTotalPages("");
		setFormPublisher("");
		setFormBackground("");
		setFormThumbnailUrl("");
		setFormReadingStatus("unread");
		setFormTargetCompleteDate(getOneMonthLaterDate());
		setFormCompletedPages("");
		setFormTargetPagesPerDay("");
	}, [addBook, formTitle, formAuthor, formThumbnailUrl]);

	const handleSelectBook = useCallback((book: Book) => {
		setSelectedBook(book);
		bookDetailOverlay.open();
	}, [bookDetailOverlay]);

	const handleCloseBookDetail = useCallback(() => {
		bookDetailOverlay.close();
	}, [bookDetailOverlay]);

	const handleUpdateBookBackground = useCallback(async (bookId: number, background: string) => {
		if (updateBook) {
			await updateBook(bookId, { background });
			// 選択中の本も更新
			if (selectedBook?.id === bookId) {
				setSelectedBook({ ...selectedBook, background });
			}
		}
	}, [updateBook, selectedBook]);

	const handleAddLog = useCallback(() => {
		// TODO: ログ追加画面への遷移を実装
		bookDetailOverlay.close();
	}, [bookDetailOverlay]);

	const handleDeleteLog = useCallback(
		async (logId: number) => {
			await removeLog(logId);
		},
		[removeLog]
	);

	const handleUpdateLogMemo = useCallback(
		async (logId: number, memoText: string) => {
			const errorMessage = await updateLog(logId, { memo: memoText });
			if (errorMessage) {
				console.error("ログの更新に失敗しました:", errorMessage);
			}
		},
		[updateLog]
	);

	useEffect(() => {
		if (!bookDetailOverlay.isShow) {
			setSelectedBook(null);
		}
	}, [bookDetailOverlay.isShow]);

	return (
        <Container>
            <BookShelf
                books={displayBooks}
                formTitle={formTitle}
                formAuthor={formAuthor}
                formTotalPages={formTotalPages}
                formPublisher={formPublisher}
                formBackground={formBackground}
                formThumbnailUrl={formThumbnailUrl}
                formReadingStatus={formReadingStatus}
                formTargetCompleteDate={formTargetCompleteDate}
                formCompletedPages={formCompletedPages}
                formTargetPagesPerDay={formTargetPagesPerDay}
                onChangeFormTitle={setFormTitle}
                onChangeFormAuthor={setFormAuthor}
                onChangeFormTotalPages={setFormTotalPages}
                onChangeFormPublisher={setFormPublisher}
                onChangeFormBackground={setFormBackground}
                onFormThumbnailUrlChange={setFormThumbnailUrl}
                onFormReadingStatusChange={setFormReadingStatus}
				onChangeFormTargetCompleteDate={setFormTargetCompleteDate}
				onChangeFormCompletedPages={setFormCompletedPages}
				onChangeFormTargetPagesPerDay={setFormTargetPagesPerDay}
				onFormAdd={handleFormAdd}
				onDeleteBook={removeBook}
				onSelectBook={handleSelectBook}
			/>
			{selectedBook && (
				<BookDetailModal
					overlay={bookDetailOverlay}
					book={selectedBook}
					logs={displayLogs}
					onClose={handleCloseBookDetail}
					onUpdateBookBackground={handleUpdateBookBackground}
					onAddLog={handleAddLog}
					onDeleteLog={handleDeleteLog}
					onUpdateLogMemo={handleUpdateLogMemo}
				/>
			)}
        </Container>
	);
}


