/**
 * 表紙画像を使わないとき API に送る非空のダミー値（coverUrl 必須のため）。
 * 画面上では画像として読み込まずプレースホルダーを表示する。
 */
export const BOOK_COVER_PLACEHOLDER_TOKEN = "__BOOKTRACKER_NO_COVER__";

export function hasRenderableBookCover(thumbnailUrl: string | number | undefined | null): boolean {
	if (thumbnailUrl == null) return false;
	if (typeof thumbnailUrl === "number") return true;
	const s = thumbnailUrl.trim();
	if (s === "" || s === BOOK_COVER_PLACEHOLDER_TOKEN) return false;
	return true;
}
