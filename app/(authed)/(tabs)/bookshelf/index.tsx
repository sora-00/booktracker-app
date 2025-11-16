import { useEffect, useState, useCallback } from "react";
import { useBooks } from "@mods/hooks/useBooks";
import BookShelf from "@ui/container/book-shelf/BookShelf";
import { Container } from "@ui/common/Container";
import type { ReadingStatus } from "@ui/container/book-shelf/ReadingStatusSelector";
import { calculatePagesPerDay } from "@ui/utils/reading";
import { getOneMonthLaterDate } from "@ui/utils/date";

export default function BookshelfScreen() {
	const { books, getBooks, addBook } = useBooks();
	
	// BookForm用の状態管理
	const [formTitle, setFormTitle] = useState("");
	const [formAuthor, setFormAuthor] = useState("");
	const [formTotalPages, setFormTotalPages] = useState("");
	const [formPublisher, setFormPublisher] = useState("");
	const [formThumbnailUrl, setFormThumbnailUrl] = useState<string | undefined>(undefined);
	const [formBackground, setFormBackground] = useState("");
	const [formReadingStatus, setFormReadingStatus] = useState<ReadingStatus>("unread");
	const [formTargetCompleteDate, setFormTargetCompleteDate] = useState(getOneMonthLaterDate());
	const [formCompletedPages, setFormCompletedPages] = useState("");
	const [formTargetPagesPerDay, setFormTargetPagesPerDay] = useState("");

	useEffect(() => {
		getBooks();
	}, [getBooks]);

	// 目標読了日が変更されたときに目標ページ数/日を自動計算
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
			thumbnailUrl: formThumbnailUrl,
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
		setFormThumbnailUrl(undefined);
		setFormBackground("");
		setFormReadingStatus("unread");
		setFormTargetCompleteDate(getOneMonthLaterDate());
		setFormCompletedPages("");
		setFormTargetPagesPerDay("");
	}, [addBook, formTitle, formAuthor, formThumbnailUrl]);

	return (
        <Container>
            <BookShelf
                books={books}
                formTitle={formTitle}
                formAuthor={formAuthor}
                formTotalPages={formTotalPages}
                formPublisher={formPublisher}
                formThumbnailUrl={formThumbnailUrl}
                formBackground={formBackground}
                formReadingStatus={formReadingStatus}
                formTargetCompleteDate={formTargetCompleteDate}
                formCompletedPages={formCompletedPages}
                formTargetPagesPerDay={formTargetPagesPerDay}
                onChangeFormTitle={setFormTitle}
                onChangeFormAuthor={setFormAuthor}
                onChangeFormTotalPages={setFormTotalPages}
                onChangeFormPublisher={setFormPublisher}
                onChangeFormBackground={setFormBackground}
                onFormReadingStatusChange={setFormReadingStatus}
                onChangeFormTargetCompleteDate={setFormTargetCompleteDate}
                onFormThumbnailUrlChange={setFormThumbnailUrl}
                onChangeFormCompletedPages={setFormCompletedPages}
                onChangeFormTargetPagesPerDay={setFormTargetPagesPerDay}
                onFormAdd={handleFormAdd}
            />
        </Container>
	);
}


