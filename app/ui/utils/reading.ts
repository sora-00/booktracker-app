import { parseDate, formatDate } from "./date";

/**
 * 目標読了日から目標ページ数/日を計算
 * @param targetCompleteDate 目標読了日（YYYY-MM-DD形式）
 * @param totalPages 総ページ数
 * @param completedPages 読み終わったページ数
 * @returns 目標ページ数/日（計算できない場合はnull）
 */
export const calculatePagesPerDay = (
	targetCompleteDate: string,
	totalPages: string,
	completedPages: string
): number | null => {
	const totalPagesNum = Number(totalPages);
	const completedPagesNum = Number(completedPages) || 0;
	
	if (!targetCompleteDate || !totalPagesNum || totalPagesNum <= completedPagesNum) {
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

	const remainingPages = totalPagesNum - completedPagesNum;
	const pagesPerDay = Math.ceil(remainingPages / diffDays);
	
	return pagesPerDay > 0 ? pagesPerDay : null;
};

/**
 * 目標ページ数/日から目標読了日を計算
 * @param targetPagesPerDay 目標ページ数/日
 * @param totalPages 総ページ数
 * @param completedPages 読み終わったページ数
 * @returns 目標読了日（YYYY-MM-DD形式、計算できない場合はnull）
 */
export const calculateTargetCompleteDate = (
	targetPagesPerDay: string,
	totalPages: string,
	completedPages: string
): string | null => {
	const totalPagesNum = Number(totalPages);
	const completedPagesNum = Number(completedPages) || 0;
	const pagesPerDay = Number(targetPagesPerDay);
	
	if (!pagesPerDay || !totalPagesNum || totalPagesNum <= completedPagesNum) {
		return null;
	}

	const remainingPages = totalPagesNum - completedPagesNum;
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
 * @param completedPages 読み終わったページ数
 * @param totalPages 総ページ数
 * @returns 進捗率（0-100の整数）
 */
export const calculateProgress = (completedPages: number, totalPages: number): number => {
	if (!totalPages || totalPages === 0) return 0;
	return Math.round((completedPages / totalPages) * 100);
};

