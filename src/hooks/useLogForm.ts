import { useState, useCallback, useEffect } from "react";
import { formatDate } from "@/utils/date";
import type { Book } from "@/types";

/**
 * 読書ログフォームの状態管理
 */
export function useLogForm() {
	const [selectedBook, setSelectedBook] = useState<Book | null>(null);
	const [readDate, setReadDate] = useState(formatDate(new Date()));
	const [startPage, setStartPage] = useState("");
	const [endPage, setEndPage] = useState("");
	const [memo, setMemo] = useState("");

	// 本が選択されたときに、読み始めたページをreadPagesで初期化
	useEffect(() => {
		if (selectedBook) {
			setStartPage(selectedBook.readPages.toString());
		} else {
			setStartPage("");
		}
	}, [selectedBook]);

	const resetForm = useCallback(() => {
		setSelectedBook(null);
		setReadDate(formatDate(new Date()));
		setStartPage("");
		setEndPage("");
		setMemo("");
	}, []);

	return {
		selectedBook,
		readDate,
		startPage,
		endPage,
		memo,
		setSelectedBook,
		setReadDate,
		setStartPage,
		setEndPage,
		setMemo,
		resetForm,
	};
}
