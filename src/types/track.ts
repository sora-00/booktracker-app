import type { Book } from "./book";
import type { Log } from "./log";

export type TrackStatus = "reading" | "completed";

export type BookWithLogs = Book & { logs: Log[] };
