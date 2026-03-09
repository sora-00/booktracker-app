import type { Book, BookResp, GetBookListOptions, NewBookInput } from "@/types";
import { fetcher } from "./cli/client";

const BOOK_API_BODY_KEYS: (keyof NewBookInput)[] = [
	"title",
	"author",
	"totalPages",
	"publisher",
	"thumbnailUrl",
	"status",
	"targetCompleteDate",
	"encounterNote",
	"readPages",
	"targetPagesPerDay",
];

/** Partial のうち定義されたキーだけ API 用の body に詰める。targetCompleteDate は null を送らない。 */
function toBookApiBody(input: Partial<NewBookInput>): Record<string, unknown> {
	const body: Record<string, unknown> = {};
	for (const key of BOOK_API_BODY_KEYS) {
		const value = input[key];
		const include = key === "targetCompleteDate" ? value != null : value !== undefined;
		if (include) body[key] = value;
	}
	return body;
}

export async function getBookList(
	accessToken: string,
	options?: GetBookListOptions
): Promise<BookResp["getBookList"]> {
	const status = options?.status;
	const path = status ? `/books/status/${status}` : "/books";
	const res = await fetcher.fetchJson<{ books: Book[] } | Book[]>({
		method: "GET",
		path,
		accessToken,
	});
	const list = Array.isArray(res) ? res : res?.books ?? [];
	return list as BookResp["getBookList"];
}

export async function getBook(accessToken: string, id: number): Promise<BookResp["getBook"]> {
	return await fetcher.fetchJson<BookResp["getBook"]>({
		method: "GET",
		path: `/books/${id}`,
		accessToken,
	});
}

export async function postBook(accessToken: string, input: NewBookInput): Promise<BookResp["postBook"]> {
	const body = toBookApiBody(input);
	return await fetcher.fetchJson<BookResp["postBook"]>({
		method: "POST",
		path: "/books",
		body,
		accessToken,
	});
}

export async function putBook(
	accessToken: string,
	id: number,
	input: Partial<NewBookInput>
): Promise<BookResp["putBook"]> {
	const body = toBookApiBody(input);
	return await fetcher.fetchJson<BookResp["putBook"]>({
		method: "PUT",
		path: `/books/${id}`,
		accessToken,
		body,
	});
}

export async function deleteBook(accessToken: string, id: number): Promise<BookResp["deleteBook"]> {
	await fetcher.fetchJson<BookResp["deleteBook"]>({
		method: "DELETE",
		path: `/books/${id}`,
		accessToken,
	});
}
