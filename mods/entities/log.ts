export type Log = {
  id: number;
  bookId: number;
  readDate: string;
  startPage: number;
  endPage: number;
  memo?: string;
  createdAt: string;
  updatedAt: string;
};

export type NewLogInput = {
  bookId: number;
  readDate: string;
  startPage: number;
  endPage: number;
  memo?: string;
};

export const createLog = (id: number, input: NewLogInput, nowIso: string): Log => ({
  id,
  bookId: input.bookId,
  readDate: input.readDate,
  startPage: input.startPage,
  endPage: input.endPage,
  memo: input.memo,
  createdAt: nowIso,
  updatedAt: nowIso,
});