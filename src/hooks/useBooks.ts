import { useState, useCallback, useEffect } from "react";
import { getBookList, postBook, putBook, deleteBook } from "@/repositories/book";
import type { Book, NewBookInput, Status } from "@/types";
import { getDataSource } from "@/utils/config";

export type RetUseBooks = ReturnType<typeof useBooks>;

export type UseBooksOptions = { fixedFilter?: Status };

export function useBooks(options?: UseBooksOptions) {
	const accessToken = "";
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
		try {
			const bookList = await getBookList(accessToken, { status: effectiveFilter });
			setBooks(bookList);
			return bookList;
		} catch (err) {
			const is404 = err instanceof Error && err.message.includes("404");
			if (is404) {
				setBooks([]);
				return [];
			}
			console.error("getBooks error:", err);
			setBooks([]);
			return [];
		}
	}, [accessToken, effectiveFilter]);

	useEffect(() => {
		getBooks();
	}, [getBooks]);

	const addBook = useCallback(
		async (input: NewBookInput) => {
			setIsAdding(true);
			try {
				await postBook(accessToken, input);
				await getBooks();
				setIsAdding(false);
				return "";
			} catch (err) {
				setIsAdding(false);
				return "本の追加に失敗しました";
			}
		},
		[accessToken, getBooks]
	);

	const updateBook = useCallback(
		async (id: number, input: Partial<NewBookInput>) => {
			try {
				await putBook(accessToken, id, input);
				await getBooks();
				return "";
			} catch (err) {
				return "本の更新に失敗しました";
			}
		},
		[accessToken, getBooks]
	);

	const removeBook = useCallback(
		async (id: number) => {
			setIsRemoving(true);
			try {
				await deleteBook(accessToken, id);
				await getBooks();
				setIsRemoving(false);
			} catch (err) {
				setIsRemoving(false);
			}
		},
		[accessToken, getBooks]
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
