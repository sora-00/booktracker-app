import type { Book, BookResp, GetBookListOptions, NewBookInput } from "@/types";
import { fetcher } from "./cli/client";

function newBookInputToApiBody(input: NewBookInput) {
	return {
		title: input.title,
		author: input.author,
		totalPages: input.totalPages,
		publisher: input.publisher,
		thumbnailUrl: input.thumbnailUrl,
		status: input.status,
		targetCompleteDate: input.targetCompleteDate,
		encounterNote: input.encounterNote,
		readPages: input.readPages,
		targetPagesPerDay: input.targetPagesPerDay,
	};
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
	const body = newBookInputToApiBody(input);
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
	const body: Record<string, unknown> = {};
	if (input.title !== undefined) body.title = input.title;
	if (input.author !== undefined) body.author = input.author;
	if (input.totalPages !== undefined) body.totalPages = input.totalPages;
	if (input.publisher !== undefined) body.publisher = input.publisher;
	if (input.thumbnailUrl !== undefined) body.thumbnailUrl = input.thumbnailUrl;
	if (input.status !== undefined) body.status = input.status;
	if (input.targetCompleteDate != null) body.targetCompleteDate = input.targetCompleteDate;
	if (input.encounterNote !== undefined) body.encounterNote = input.encounterNote;
	if (input.readPages !== undefined) body.readPages = input.readPages;
	if (input.targetPagesPerDay !== undefined) body.targetPagesPerDay = input.targetPagesPerDay;
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
