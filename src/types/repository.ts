import type { Book } from "./book";
import type { Log } from "./log";
import type { Status } from "./status";

export type BookResp = {
	getBookList: Book[];
	getBook: Book;
	postBook: Book;
	putBook: Book;
	deleteBook: void;
};

export type GetBookListOptions = { status?: Status };

export type LogResp = {
	getLogList: ReadonlyArray<Log>;
	getLog: Log;
	postLog: Log;
	putLog: Log;
	deleteLog: void;
};

export type GetLogListOptions = { status?: Status };

export type BookThumbnailUploadResponse = {
	id: string;
	url: string;
};
