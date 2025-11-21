import { useMemo, useState, useCallback } from "react";
import { mockBooks } from "@mods/types/mock/book";
import { mockLogs } from "@mods/types/mock/log";
import { Track } from "@mods/ui/container/track/Track";
import type { TrackStatus } from "@mods/types/track";
import type { BookWithLogs } from "@mods/ui/container/track/types";

export default function TrackScreen() {
	const [statusFilter, setStatusFilter] = useState<TrackStatus>("reading");
	const [selectedBook, setSelectedBook] = useState<BookWithLogs | null>(null);

	const displayBooks = mockBooks;
	const displayLogs = mockLogs;

	const booksWithLogs = useMemo<BookWithLogs[]>(() => {
		return displayBooks.map((book) => ({
			...book,
			logs: displayLogs.filter((log) => log.bookId === book.id),
		}));
	}, [displayBooks, displayLogs]);

	const filteredBooks = useMemo(() => {
		return booksWithLogs.filter((book) => book.status === statusFilter);
	}, [booksWithLogs, statusFilter]);

	const emptyMessage = statusFilter === "reading" ? "読み途中の本がありません" : "読破した本がありません";

	const handleChangeStatus = useCallback((status: TrackStatus) => {
		setStatusFilter(status);
	}, []);

	const handleSelectBook = useCallback(
		(book: BookWithLogs) => {
			setSelectedBook(book);
		},
		[]
	);

	return (

			<Track
				books={filteredBooks}
				statusFilter={statusFilter}
				onChangeStatusFilter={handleChangeStatus}
				emptyMessage={emptyMessage}
				onSelectBook={handleSelectBook}
			/>
	);
}


