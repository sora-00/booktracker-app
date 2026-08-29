import { useCallback } from "react";
import { Alert } from "react-native";
import type { NewBookInput } from "@/types";
import { BOOK_COVER_PLACEHOLDER_TOKEN } from "@/utils/bookCover";

type BookFormForSubmit = {
	title: string;
	author: string;
	totalPages: string;
	publisher: string;
	encounterNote: string;
	readingStatus: NewBookInput["status"];
	targetCompleteDate: string;
	readPages: string;
	targetPagesPerDay: string;
	resetForm: () => void;
};

type AddBookFn = (input: NewBookInput) => Promise<string>;

/**
 * 本フォームの送信（バリデーション + addBook + リセット）。
 * 戻り値: 追加に成功したら true、失敗またはバリデーションエラーなら false（エラーは Alert で表示済み）
 */
export function useBookFormSubmit(bookForm: BookFormForSubmit, addBook: AddBookFn) {
	const handleFormAdd = useCallback(async (): Promise<boolean> => {
		const errorMessage = await addBook({
			title: bookForm.title.trim(),
			author: bookForm.author.trim(),
			totalPages: bookForm.totalPages ? parseInt(bookForm.totalPages, 10) : 0,
			publisher: bookForm.publisher.trim(),
			encounterNote: bookForm.encounterNote || "",
			thumbnailUrl: BOOK_COVER_PLACEHOLDER_TOKEN,
			status: bookForm.readingStatus,
			targetCompleteDate: bookForm.targetCompleteDate,
			readPages: bookForm.readPages ? parseInt(bookForm.readPages, 10) : 0,
			targetPagesPerDay: bookForm.targetPagesPerDay ? parseInt(bookForm.targetPagesPerDay, 10) : 0,
		});

		if (errorMessage) {
			Alert.alert("エラー", errorMessage);
			return false;
		}

		bookForm.resetForm();
		return true;
	}, [bookForm, addBook]);

	return { handleFormAdd };
}
