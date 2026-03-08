import { useMemo } from "react";
import type { Book, BookWithLogs, Log } from "@/types";

/**
 * 本一覧にログを紐付けて BookWithLogs[] を返す
 */
export function useBooksWithLogs(books: Book[], logs: Log[]): BookWithLogs[] {
	return useMemo(
		() =>
			books.map((book) => ({
				...book,
				logs: logs.filter((log) => log.bookId === book.id),
			})),
		[books, logs]
	);
}
