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

/**
 * YYYY-MM-DD形式の日付をYYYY/MM/DD形式に変換
 */
export const formatDateSlash = (dateString: string): string => {
	if (!dateString) return "";
	const [year, month, day] = dateString.split("-");
	return `${year}/${month}/${day}`;
};

/**
 * ISO8601形式の日付文字列からYYYY/MM/DD形式の日付を取得
 */
export const getDateFromISO = (isoString: string): string => {
	if (!isoString) return "";
	const date = new Date(isoString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}/${month}/${day}`;
};

/**
 * 目標読了日までの残り日数を計算
 * @param targetDate 目標読了日（YYYY-MM-DD形式）
 * @returns 残り日数（負の値の場合は0を返す）
 */
export const calculateRemainingDays = (targetDate: string): number => {
	if (!targetDate) return 0;
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const target = parseDate(targetDate);
	target.setHours(0, 0, 0, 0);
	
	const diffTime = target.getTime() - today.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	
	return diffDays > 0 ? diffDays : 0;
};

