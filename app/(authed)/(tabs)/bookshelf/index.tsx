import { useEffect, useState, useCallback } from "react";
import { useBooks } from "@mods/hooks/useBooks";
import BookShelf from "@ui/container/book-shelf/BookShelf";
import { Container } from "@ui/common/Container";
import type { Status } from "@mods/entities/status";
import { calculatePagesPerDay } from "@ui/utils/reading";
import { getOneMonthLaterDate } from "@ui/utils/date";
import { mockBooks } from "@mods/types/mock/book";

export default function BookshelfScreen() {
	const { books, getBooks, addBook, removeBook } = useBooks();
	
	// 一時的にモックデータを使用
	const displayBooks = mockBooks;
	
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
			/>
        </Container>
	);
}


