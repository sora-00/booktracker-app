import { useMemo, useState, useCallback, useEffect } from "react";
import { mockBooks } from "@mods/types/mock/book";
import { mockLogs } from "@mods/types/mock/log";
import { Track } from "@mods/ui/container/track/Track";
import type { TrackStatus } from "@mods/types/track";
import type { BookWithLogs } from "@mods/ui/container/track/types";
import type { Log } from "@mods/entities/log";
import { useOverlay } from "@ui/hooks/useOverlay";
import { LogDetailModal } from "@mods/ui/container/track/popup/LogDetailModal";

export default function TrackScreen() {
	const [statusFilter, setStatusFilter] = useState<TrackStatus>("reading");
	const [selectedLogContext, setSelectedLogContext] = useState<{ book: BookWithLogs; log: Log } | null>(null);
	const logDetailOverlay = useOverlay();

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

	const handleSelectLog = useCallback(
		(book: BookWithLogs, log: Log) => {
			setSelectedLogContext({ book, log });
			logDetailOverlay.open();
		},
		[logDetailOverlay]
	);

	const handleCloseLogDetail = useCallback(() => {
		logDetailOverlay.close();
	}, [logDetailOverlay]);

	useEffect(() => {
		if (!logDetailOverlay.isShow) {
			setSelectedLogContext(null);
		}
	}, [logDetailOverlay.isShow]);

	return (
		<>
			<Track
				books={filteredBooks}
				statusFilter={statusFilter}
				onChangeStatusFilter={handleChangeStatus}
				emptyMessage={emptyMessage}
				onSelectLog={handleSelectLog}
			/>
			{selectedLogContext && (
				<LogDetailModal
					overlay={logDetailOverlay}
					book={selectedLogContext.book}
					log={selectedLogContext.log}
					onClose={handleCloseLogDetail}
				/>
			)}
		</>
	);
}


