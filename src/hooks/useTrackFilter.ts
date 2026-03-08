import { useState, useCallback } from "react";
import type { TrackStatus } from "@/types";

const EMPTY_MESSAGES: Record<TrackStatus, string> = {
	reading: "読み途中の本がありません",
	completed: "読破した本がありません",
};

/**
 * トラック画面のステータスフィルタ（読み中/読了）を管理
 */
export function useTrackFilter() {
	const [statusFilter, setStatusFilter] = useState<TrackStatus>("reading");

	const onChangeStatus = useCallback((status: TrackStatus) => {
		setStatusFilter(status);
	}, []);

	return {
		statusFilter,
		onChangeStatus,
		emptyMessage: EMPTY_MESSAGES[statusFilter],
	};
}
