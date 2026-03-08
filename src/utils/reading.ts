import { parseDate, formatDate } from "./date";

/**
 * 目標読破日から目標ページ数/日を計算
 */
export const calculatePagesPerDay = (
	targetCompleteDate: string,
	totalPages: string,
	readPages: string
): number | null => {
	const totalPagesNum = Number(totalPages);
	const readPagesNum = Number(readPages) || 0;

	if (!targetCompleteDate || !totalPagesNum || totalPagesNum <= readPagesNum) {
		return null;
	}

	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const target = parseDate(targetCompleteDate);
	target.setHours(0, 0, 0, 0);

	const diffTime = target.getTime() - today.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays <= 0) {
		return null;
	}

	const remainingPages = totalPagesNum - readPagesNum;
	const pagesPerDay = Math.ceil(remainingPages / diffDays);

	return pagesPerDay > 0 ? pagesPerDay : null;
};

/**
 * 目標ページ数/日から目標読破日を計算
 */
export const calculateTargetCompleteDate = (
	targetPagesPerDay: string,
	totalPages: string,
	readPages: string
): string | null => {
	const totalPagesNum = Number(totalPages);
	const readPagesNum = Number(readPages) || 0;
	const pagesPerDay = Number(targetPagesPerDay);

	if (!pagesPerDay || !totalPagesNum || totalPagesNum <= readPagesNum) {
		return null;
	}

	const remainingPages = totalPagesNum - readPagesNum;
	const daysNeeded = Math.ceil(remainingPages / pagesPerDay);

	if (daysNeeded <= 0) {
		return null;
	}

	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const targetDate = new Date(today);
	targetDate.setDate(today.getDate() + daysNeeded);

	return formatDate(targetDate);
};

/**
 * 進捗率を計算（%）
 */
export const calculateProgress = (readPages: number, totalPages: number): number => {
	if (!totalPages || totalPages === 0) return 0;
	return Math.round((readPages / totalPages) * 100);
};
