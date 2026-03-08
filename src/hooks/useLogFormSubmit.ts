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

type UpdateBookFn = (id: number, input: { readPages?: number }) => Promise<string>;
type AddLogFn = (input: NewLogInput) => Promise<string>;

/**
 * 読書ログフォームの送信（addLog + updateBook + リセット）
 */
export function useLogFormSubmit(
	form: LogFormState,
	updateBook: UpdateBookFn,
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

		const updateBookError = await updateBook(selectedBook.id, { readPages: endPageNum });
		if (updateBookError) {
			console.error("bookの更新に失敗しました:", updateBookError);
			return;
		}

		resetForm();
	}, [form, updateBook, addLog]);

	return { handleFormAdd };
}
