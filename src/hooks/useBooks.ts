import { useState, useCallback, useEffect } from "react";
import { getBookList, postBook, putBook, deleteBook } from "@/repositories/book";
import type { Book, NewBookInput, Status } from "@/types";
import { getDataSource } from "@/utils/config";
import { useAuth } from "@/hooks/useAuth";

export type RetUseBooks = ReturnType<typeof useBooks>;

export type UseBooksOptions = { fixedFilter?: Status };

export function useBooks(options?: UseBooksOptions) {
	const { accessToken, isLoading: authLoading } = useAuth();
	const fixedFilter = options?.fixedFilter;

	const [isLoading, setIsLoading] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [isRemoving, setIsRemoving] = useState(false);
	const [books, setBooks] = useState<Book[]>([]);
	const [selectedFilter, setSelectedFilter] = useState<Status | undefined>(undefined);

	const effectiveFilter = fixedFilter ?? selectedFilter;

	const getBooks = useCallback(async () => {
		if (getDataSource() === "memory") {
			return [];
		}
		// 認証確定前はトークン付き API を呼ばない（ログイン／トークン同期が終わってから）
		if (authLoading) {
			return [];
		}
		if (!accessToken) {
			setBooks([]);
			return [];
		}
		try {
			const bookList = await getBookList(accessToken, { status: effectiveFilter });
			setBooks(bookList);
			return bookList;
		} catch (err) {
			const is404 = err instanceof Error && err.message.includes("404");
			if (is404) {
				// 404 のときは一覧を空で上書きしない（addBook の楽観的更新を残す）
				return [];
			}
			console.error("getBooks error:", err);
			setBooks([]);
			return [];
		}
	}, [accessToken, authLoading, effectiveFilter]);

	useEffect(() => {
		getBooks();
	}, [getBooks]);

	const addBook = useCallback(
		async (input: NewBookInput) => {
			if (authLoading || !accessToken) {
				return "認証情報がありません。再ログインしてください";
			}
			setIsAdding(true);
			try {
				const created = await postBook(accessToken, input);
				// 追加した本をすぐ画面に出す（getBooks が 404 等で失敗しても表示されるようにする）
				const matchesFilter = !effectiveFilter || created.status === effectiveFilter;
				if (matchesFilter) {
					setBooks((prev) => [...prev, created]);
				}
				await getBooks();
				setIsAdding(false);
				return "";
			} catch (err) {
				setIsAdding(false);
				const message = err instanceof Error ? err.message : "";
				// API が返した本文（バリデーションエラー等）があればそのまま表示する
				const apiMessage = message.startsWith("HTTP ")
					? message.replace(/^HTTP \d+ [^:]+:?\s*/i, "").trim()
					: message;
				console.error("addBook error:", message);
				return apiMessage || "本の追加に失敗しました";
			}
		},
		[accessToken, authLoading, effectiveFilter, getBooks]
	);

	const updateBook = useCallback(
		async (id: number, input: Partial<NewBookInput>) => {
			if (authLoading || !accessToken) {
				return "認証情報がありません。再ログインしてください";
			}
			try {
				await putBook(accessToken, id, input);
				await getBooks();
				return "";
			} catch (err) {
				return "本の更新に失敗しました";
			}
		},
		[accessToken, authLoading, getBooks]
	);

	const removeBook = useCallback(
		async (id: number) => {
			if (authLoading || !accessToken) {
				return;
			}
			setIsRemoving(true);
			try {
				await deleteBook(accessToken, id);
				await getBooks();
				setIsRemoving(false);
			} catch (err) {
				setIsRemoving(false);
			}
		},
		[accessToken, authLoading, getBooks]
	);

	return {
		isLoading,
		isAdding,
		isRemoving,
		books,
		selectedFilter,
		setSelectedFilter,
		getBooks,
		addBook,
		updateBook,
		removeBook,
	};
}
