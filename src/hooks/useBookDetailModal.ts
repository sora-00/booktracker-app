import { useState, useCallback, useEffect } from "react";
import { useOverlay } from "@/hooks/useOverlay";
import type { Book, Log } from "@/types";

type UpdateBook = (id: number, input: { encounterNote?: string }) => Promise<string>;
type RemoveLog = (logId: number) => Promise<void>;
type UpdateLog = (logId: number, input: { memo?: string }) => Promise<string | undefined>;

type UseBookDetailModalParams = {
	logs: Log[];
	updateBook: UpdateBook;
	removeLog: RemoveLog;
	updateLog: UpdateLog;
};

/**
 * 本詳細モーダルの開閉・選択中書籍・ログ/本更新のハンドラをまとめたhook
 */
export function useBookDetailModal({
	logs,
	updateBook,
	removeLog,
	updateLog,
}: UseBookDetailModalParams) {
	const [selectedBook, setSelectedBook] = useState<Book | null>(null);
	const overlay = useOverlay();

	const openBookDetail = useCallback((book: Book) => {
		setSelectedBook(book);
		overlay.open();
	}, [overlay]);

	const closeBookDetail = useCallback(() => {
		overlay.close();
	}, [overlay]);

	const handleUpdateBookEncounterNote = useCallback(
		async (bookId: number, encounterNote: string) => {
			await updateBook(bookId, { encounterNote });
			setSelectedBook((prev) =>
				prev?.id === bookId ? (prev ? { ...prev, encounterNote } : null) : prev
			);
		},
		[updateBook]
	);

	const handleAddLog = useCallback(() => {
		// TODO: ログ追加画面への遷移を実装
		overlay.close();
	}, [overlay]);

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
		if (!overlay.isShow) {
			setSelectedBook(null);
		}
	}, [overlay.isShow]);

	return {
		selectedBook,
		bookDetailOverlay: overlay,
		openBookDetail,
		closeBookDetail,
		handleUpdateBookEncounterNote,
		handleAddLog,
		handleDeleteLog,
		handleUpdateLogMemo,
	};
}
