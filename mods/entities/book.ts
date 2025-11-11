export type Book = {
  id: number;
  title: string;
  author: string;
  thumbnailUrl?: string;
  description?: string;
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
};

export type NewBookInput = {
  title: string;
  author: string;
  thumbnailUrl?: string;
  description?: string;
};

export const createBook = (id: number, input: NewBookInput, nowIso: string): Book => ({
  id,
  title: input.title,
  author: input.author,
  thumbnailUrl: input.thumbnailUrl,
  description: input.description,
  createdAt: nowIso,
  updatedAt: nowIso,
});

export const updateBook = (book: Book, input: Partial<NewBookInput>, nowIso: string): Book => ({
  ...book,
  ...input,
  updatedAt: nowIso,
});


