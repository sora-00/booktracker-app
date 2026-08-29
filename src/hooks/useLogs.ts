import { useState, useCallback, useEffect } from "react";
import { getLogList, postLog, putLog, deleteLog } from "@/repositories/log";
import type { Log, NewLogInput, Status } from "@/types";
import { getDataSource } from "@/utils/config";
import { useAuth } from "@/hooks/useAuth";

export type RetUseLogs = ReturnType<typeof useLogs>;

export function useLogs() {
	const { accessToken, isLoading: authLoading } = useAuth();

	const [isLoading, setIsLoading] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [isRemoving, setIsRemoving] = useState(false);
	const [logs, setLogs] = useState<Log[]>([]);
	const [selectedFilter, setSelectedFilter] = useState<Status | undefined>(undefined);

	const getLogs = useCallback(async () => {
		if (getDataSource() === "memory") {
			return [];
		}
		if (authLoading) {
			return [];
		}
		if (!accessToken) {
			setLogs([]);
			return [];
		}
		try {
			const data = await getLogList(accessToken, { status: selectedFilter });
			const logList = Array.from(data);
			setLogs(logList);
			return logList;
		} catch (err) {
			const is404 = err instanceof Error && err.message.includes("404");
			if (is404) {
				setLogs([]);
				return [];
			}
			console.error("getLogs error:", err);
			setLogs([]);
			return [];
		}
	}, [accessToken, authLoading, selectedFilter]);

	useEffect(() => {
		getLogs();
	}, [getLogs]);

	const addLog = useCallback(
		async (input: NewLogInput) => {
			if (authLoading || !accessToken) {
				return "認証情報がありません。再ログインしてください";
			}
			setIsAdding(true);
			try {
				await postLog(accessToken, input);
				await getLogs();
				setIsAdding(false);
				return "";
			} catch (err) {
				setIsAdding(false);
				return "ログの追加に失敗しました";
			}
		},
		[accessToken, authLoading, getLogs]
	);

	const updateLog = useCallback(
		async (id: number, input: Partial<NewLogInput>) => {
			if (authLoading || !accessToken) {
				return "認証情報がありません。再ログインしてください";
			}
			try {
				await putLog(accessToken, id, input);
				await getLogs();
				return "";
			} catch (err) {
				return "ログの更新に失敗しました";
			}
		},
		[accessToken, authLoading, getLogs]
	);

	const removeLog = useCallback(
		async (id: number) => {
			if (authLoading || !accessToken) {
				return;
			}
			setIsRemoving(true);
			try {
				await deleteLog(accessToken, id);
				await getLogs();
				setIsRemoving(false);
			} catch (err) {
				setIsRemoving(false);
			}
		},
		[accessToken, authLoading, getLogs]
	);

	return {
		isLoading,
		isAdding,
		isRemoving,
		logs,
		selectedFilter,
		setSelectedFilter,
		getLogs,
		addLog,
		updateLog,
		removeLog,
	};
}
