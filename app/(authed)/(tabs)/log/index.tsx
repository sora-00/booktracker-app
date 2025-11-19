import { useState, useCallback, useEffect } from "react";
import { useBooks } from "@mods/hooks/useBooks";
import Log from "@ui/container/log/Log";
import { Container } from "@ui/common/Container";
import { formatDate } from "@ui/utils/date";
import { mockBooks } from "@mods/types/mock/book";
import { mockLogs } from "@mods/types/mock/log";
import { useLogs } from "@mods/hooks/useLogs";
import type { Book } from "@mods/entities";

export default function LogScreen() {
	const { books, getBooks, updateBook } = useBooks();
	const { logs, getLogs, updateLog, removeLog } = useLogs();
	
	// 一時的にモックデータを使用

	const displayBooks = mockBooks;
	const displayLogs = mockLogs;
	
	// BookLogForm用の状態管理
	const [selectedBook, setSelectedBook] = useState<Book | null>(null);
	const [readDate, setReadDate] = useState(formatDate(new Date()));
	const [startPage, setStartPage] = useState("");
	const [endPage, setEndPage] = useState("");
	const [memo, setMemo] = useState("");

	// 本が選択されたときに、読み始めたページをcompletedPagesで初期化
	useEffect(() => {
		if (selectedBook) {
			setStartPage(selectedBook.completedPages.toString());
		} else {
			setStartPage("");
		}
	}, [selectedBook]);

	const handleFormAdd = useCallback(async () => {
		if (!selectedBook || !readDate || !endPage) {
			return;
		}

		// TODO: ログ記録を追加するAPIを呼び出す
		console.log("ログを追加:", {
			bookId: selectedBook.id,
			readDate,
			startPage: startPage ? parseInt(startPage) : undefined,
			endPage: endPage ? parseInt(endPage) : undefined,
			memo,
		});

		// bookのcompletedPagesを更新
		const newCompletedPages = parseInt(endPage);
		if (!isNaN(newCompletedPages)) {
			const errorMessage = await updateBook(selectedBook.id, { completedPages: newCompletedPages });
			if (errorMessage) {
				console.error("bookの更新に失敗しました:", errorMessage);
				return;
			}
		}

		// フォームをリセット
		setSelectedBook(null);
		setReadDate(formatDate(new Date()));
		setStartPage("");
		setEndPage("");
		setMemo("");
	}, [selectedBook, readDate, startPage, endPage, memo, updateBook]);

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

	return (
		<Container>
			<Log
				logs={displayLogs}
				selectedBook={selectedBook}
				readDate={readDate}
				startPage={startPage}
				endPage={endPage}
				memo={memo}
				books={displayBooks}
				onSelectBook={setSelectedBook}
				onChangeReadDate={setReadDate}
				onChangeStartPage={setStartPage}
				onChangeEndPage={setEndPage}
				onChangeMemo={setMemo}
				onFormAdd={handleFormAdd}
				onDeleteLog={handleDeleteLog}
				onUpdateLogMemo={handleUpdateLogMemo}
			/>
		</Container>
	);
}
