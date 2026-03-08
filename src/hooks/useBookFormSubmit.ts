import { useCallback } from "react";
import { Alert } from "react-native";
import type { NewBookInput } from "@/types";

type BookFormForSubmit = {
	title: string;
	author: string;
	totalPages: string;
	publisher: string;
	encounterNote: string;
	thumbnailUrl: string;
	readingStatus: NewBookInput["status"];
	targetCompleteDate: string;
	readPages: string;
	targetPagesPerDay: string;
	hasThumbnailImage: boolean;
	thumbnailUploading: boolean;
	resetForm: () => void;
};

type AddBookFn = (input: NewBookInput) => Promise<string>;

/**
 * 本フォームの送信（バリデーション + addBook + リセット）
 */
export function useBookFormSubmit(bookForm: BookFormForSubmit, addBook: AddBookFn) {
	const handleFormAdd = useCallback(async () => {
		if (!bookForm.thumbnailUrl.trim()) {
			if (bookForm.hasThumbnailImage && bookForm.thumbnailUploading) {
				Alert.alert("入力エラー", "画像をアップロード中です。しばらくお待ちください");
				return;
			}
			if (bookForm.hasThumbnailImage && !bookForm.thumbnailUploading) {
				Alert.alert(
					"入力エラー",
					"表紙画像のアップロードに失敗しました。ネットワークを確認してください。"
				);
				return;
			}
		}

		const errorMessage = await addBook({
			title: bookForm.title.trim(),
			author: bookForm.author.trim(),
			totalPages: bookForm.totalPages ? parseInt(bookForm.totalPages, 10) : 0,
			publisher: bookForm.publisher.trim(),
			encounterNote: bookForm.encounterNote || "",
			thumbnailUrl: bookForm.thumbnailUrl.trim(),
			status: bookForm.readingStatus,
			targetCompleteDate: bookForm.targetCompleteDate,
			readPages: bookForm.readPages ? parseInt(bookForm.readPages, 10) : 0,
			targetPagesPerDay: bookForm.targetPagesPerDay ? parseInt(bookForm.targetPagesPerDay, 10) : 0,
		});

		if (errorMessage) {
			Alert.alert("エラー", errorMessage);
			return;
		}

		bookForm.resetForm();
	}, [bookForm, addBook]);

	return { handleFormAdd };
}
