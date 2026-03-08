import { useEffect, useCallback } from "react";
import { useBooks } from "@/hooks/useBooks";
import { useLogs } from "@/hooks/useLogs";
import { useLogForm } from "@/hooks/useLogForm";
import { useLogFormSubmit } from "@/hooks/useLogFormSubmit";
import Log from "@/components/container/log/Log";
import { Container } from "@/components/common/Container";

export default function LogScreen() {
	const { books: displayBooks, getBooks, updateBook } = useBooks();
	const { logs: displayLogs, selectedFilter, setSelectedFilter, getLogs, addLog, updateLog, removeLog } = useLogs();
	const logForm = useLogForm();
	const { handleFormAdd } = useLogFormSubmit(logForm, updateBook, addLog);

	useEffect(() => {
		getBooks();
		getLogs();
	}, [getBooks, getLogs]);

	const handleDeleteLog = useCallback(
		async (logId: number) => {
			await removeLog(logId);
		},
		[removeLog]
	);

	const handleUpdateLogMemo = useCallback(
		async (logId: number, memoText: string) => {
			const errorMessage = await updateLog(logId, { memo: memoText });
			if (errorMessage) {
				console.error("ログの更新に失敗しました:", errorMessage);
			}
		},
		[updateLog]
	);

	return (
		<Container>
			<Log
				logs={displayLogs}
				selectedFilter={selectedFilter}
				onFilterChange={setSelectedFilter}
				selectedBook={logForm.selectedBook}
				readDate={logForm.readDate}
				startPage={logForm.startPage}
				endPage={logForm.endPage}
				memo={logForm.memo}
				books={displayBooks}
				onSelectBook={logForm.setSelectedBook}
				onChangeReadDate={logForm.setReadDate}
				onChangeStartPage={logForm.setStartPage}
				onChangeEndPage={logForm.setEndPage}
				onChangeMemo={logForm.setMemo}
				onFormAdd={handleFormAdd}
				onDeleteLog={handleDeleteLog}
				onUpdateLogMemo={handleUpdateLogMemo}
			/>
		</Container>
	);
}
