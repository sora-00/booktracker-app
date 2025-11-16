/**
 * 日付フォーマット関連のユーティリティ関数
 */

/**
 * DateオブジェクトをYYYY-MM-DD形式の文字列に変換
 */
export const formatDate = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

/**
 * YYYY-MM-DD形式の文字列を表示用の形式（YYYY年M月D日）に変換
 */
export const formatDateForDisplay = (dateString: string): string => {
	if (!dateString) {
		return "";
	}
	const [year, month, day] = dateString.split("-");
	return `${year}年${Number(month)}月${Number(day)}日`;
};

/**
 * YYYY-MM-DD形式の文字列をDateオブジェクトに変換
 */
export const parseDate = (dateString: string): Date => {
	if (!dateString) {
		return new Date();
	}
	const [year, month, day] = dateString.split("-").map(Number);
	return new Date(year, month - 1, day);
};

/**
 * 今日から1ヶ月後の日付をYYYY-MM-DD形式の文字列で取得
 */
export const getOneMonthLaterDate = (): string => {
	const today = new Date();
	const oneMonthLater = new Date(today);
	oneMonthLater.setMonth(today.getMonth() + 1);
	return formatDate(oneMonthLater);
};

