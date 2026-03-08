import type { BookThumbnailUploadResponse } from "@/types";
import { fetchFileUpload } from "@/utils/http";
import { getApiBaseUrl } from "@/utils/config";

/**
 * 本の表紙画像をアップロードする。
 * 表紙用エンドポイント POST /api/books/thumbnails を利用する。
 */
export async function postBookThumbnail(
	file: {
		uri: string;
		name: string;
		type: string;
	},
	accessToken?: string | null
): Promise<{ err?: Error; data?: BookThumbnailUploadResponse }> {
	try {
		const formData = new FormData();
		formData.append("file", {
			uri: file.uri,
			name: file.name,
			type: file.type,
		} as unknown as Blob);

		const apiBaseUrl = getApiBaseUrl();
		const headers: Record<string, string> = {};
		if (accessToken) {
			headers.Authorization = `Bearer ${accessToken}`;
		}

		const res = await fetchFileUpload<BookThumbnailUploadResponse>({
			method: "POST",
			path: "/api/books/thumbnails",
			baseUrl: apiBaseUrl,
			headers,
			body: formData,
		});

		return { data: res };
	} catch (error) {
		const err = error instanceof Error ? error : new Error(String(error));
		if (__DEV__) {
			const base = getApiBaseUrl();
			console.warn("[postBookThumbnail] 失敗:", err.message, "URL:", `${base.replace(/\/$/, "")}/api/books/thumbnails`);
		}
		return { err };
	}
}
