import { useEffect } from "react";
import { useBooks } from "@/hooks/useBooks";
import { useLogs } from "@/hooks/useLogs";
import { useTrackFilter } from "@/hooks/useTrackFilter";
import { useBooksWithLogs } from "@/hooks/useBooksWithLogs";
import { useLogDetailModal } from "@/hooks/useLogDetailModal";
import { Track } from "@/components/container/track/Track";
import { LogDetailModal } from "@/components/container/track/popup/LogDetailModal";

export default function TrackScreen() {
	const { statusFilter, onChangeStatus, emptyMessage } = useTrackFilter();
	const { books: displayBooks, getBooks } = useBooks({ fixedFilter: statusFilter });
	const { logs: displayLogs, getLogs } = useLogs();
	const booksWithLogs = useBooksWithLogs(displayBooks, displayLogs);
	const logDetail = useLogDetailModal();

	useEffect(() => {
		getBooks();
		getLogs();
	}, [getBooks, getLogs]);

	return (
		<>
			<Track
				books={booksWithLogs}
				statusFilter={statusFilter}
				onChangeStatusFilter={onChangeStatus}
				emptyMessage={emptyMessage}
				onSelectLog={logDetail.openLogDetail}
			/>
			{logDetail.selectedLogContext && (
				<LogDetailModal
					overlay={logDetail.overlay}
					book={logDetail.selectedLogContext.book}
					log={logDetail.selectedLogContext.log}
					onClose={logDetail.closeLogDetail}
				/>
			)}
		</>
	);
}
