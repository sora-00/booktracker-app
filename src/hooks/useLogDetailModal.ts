import { useState, useCallback, useEffect } from "react";
import { useOverlay } from "@/hooks/useOverlay";
import type { BookWithLogs, Log } from "@/types";

/**
 * 読書ログ詳細モーダルの開閉・選択中ログをまとめたhook
 */
export function useLogDetailModal() {
	const [selectedLogContext, setSelectedLogContext] = useState<{
		book: BookWithLogs;
		log: Log;
	} | null>(null);
	const overlay = useOverlay();

	const openLogDetail = useCallback((book: BookWithLogs, log: Log) => {
		setSelectedLogContext({ book, log });
		overlay.open();
	}, [overlay]);

	const closeLogDetail = useCallback(() => {
		overlay.close();
	}, [overlay]);

	useEffect(() => {
		if (!overlay.isShow) {
			setSelectedLogContext(null);
		}
	}, [overlay.isShow]);

	return {
		selectedLogContext,
		overlay,
		openLogDetail,
		closeLogDetail,
	};
}
