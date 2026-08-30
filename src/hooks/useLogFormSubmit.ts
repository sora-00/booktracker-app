import { useCallback } from "react";
import type { Book, NewLogInput } from "@/types";

type LogFormState = {
	selectedBook: Book | null;
	readDate: string;
	startPage: string;
	endPage: string;
	memo: string;
	resetForm: () => void;
};

type AddLogFn = (input: NewLogInput) => Promise<string>;
type RefreshBooksFn = () => Promise<unknown>;

/**
 * 読書ログフォームの送信（addLog + 本一覧リフレッシュ + リセット）。
 * readPages の更新はサーバーが自動で行うため、別途 updateBook を呼ぶ必要はない。
 */
export function useLogFormSubmit(
	form: LogFormState,
	refreshBooks: RefreshBooksFn,
	addLog: AddLogFn
) {
	const handleFormAdd = useCallback(async () => {
		const { selectedBook, readDate, startPage, endPage, memo, resetForm } = form;

		if (!selectedBook || !readDate || !endPage) {
			return;
		}

		const startPageNum = startPage ? parseInt(startPage, 10) : 0;
		const endPageNum = parseInt(endPage, 10);
		if (isNaN(endPageNum)) {
			return;
		}

		const logInput: NewLogInput = {
			bookId: selectedBook.id,
			readDate,
			startPage: isNaN(startPageNum) ? 0 : startPageNum,
			endPage: endPageNum,
			memo: memo || undefined,
		};

		const addLogError = await addLog(logInput);
		if (addLogError) {
			console.error("ログの追加に失敗しました:", addLogError);
			return;
		}

		// ログ追加後にサーバー側の最新 readPages を反映させるため本一覧を再取得する
		await refreshBooks();
		resetForm();
	}, [form, refreshBooks, addLog]);

	return { handleFormAdd };
}
