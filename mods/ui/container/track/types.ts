import type { Book } from "@mods/entities/book";
import type { Log } from "@mods/entities/log";

export type BookWithLogs = Book & {
	logs: Log[];
};

