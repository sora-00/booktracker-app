import type { Status } from "./status";

export type Book = {
  id: number;
  title: string;
  author: string;
  totalPages: number;
  publisher: string;
  background?: string;
  thumbnailUrl?: string;
  status: Status;
  targetCompleteDate: string;
  completedPages: number;
  targetPagesPerDay: number;
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
};

export type NewBookInput = {
  title: string;
  author: string;
  totalPages: number;
  publisher: string;
  background?: string;
  thumbnailUrl?: string;
  status: Status;
  targetCompleteDate: string;
  completedPages: number;
  targetPagesPerDay: number;
};

export const createBook = (id: number, input: NewBookInput, nowIso: string): Book => ({
  id,
  title: input.title,
  author: input.author,
  totalPages: input.totalPages,
  publisher: input.publisher,
  background: input.background,
  thumbnailUrl: input.thumbnailUrl,
  status: input.status,
  targetCompleteDate: input.targetCompleteDate,
  completedPages: input.completedPages,
  targetPagesPerDay: input.targetPagesPerDay,
  createdAt: nowIso,
  updatedAt: nowIso,
});

export const updateBook = (book: Book, input: Partial<NewBookInput>, nowIso: string): Book => ({
  ...book,
  ...input,
  updatedAt: nowIso,
});


