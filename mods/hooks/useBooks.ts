import { useState, useCallback } from "react";
import { getBookList, postBook, putBook, deleteBook } from "../repositories/book";
import type { Book, NewBookInput } from "../entities/book";

export type RetUseBooks = ReturnType<typeof useBooks>;

export function useBooks() {
  // TODO: 実際の認証トークンを取得する実装が必要
  const accessToken = "";

  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);

  const refreshBooks = useCallback(async () => {
    try {
      const data = await getBookList(accessToken);
      console.log('getBookList response:', data);
      const bookList = Array.from(data);
      console.log('bookList after Array.from:', bookList);
      setBooks(bookList);
      return bookList;
    } catch (err) {
      console.error('refreshBooks error:', err);
      setBooks([]);
      return [];
    }
  }, [accessToken]);

  const getBooks = useCallback(async () => {
    try {
      const data = await getBookList(accessToken);
      console.log('getBooks response:', data);
      const bookList = Array.from(data);
      console.log('getBooks bookList after Array.from:', bookList);
      setBooks(bookList);
      return bookList;
    } catch (err) {
      console.error('getBooks error:', err);
      setBooks([]);
      return [];
    }
  }, [accessToken]);

  const addBook = useCallback(
    async (input: NewBookInput) => {
      setIsAdding(true);
      try {
        const data = await postBook(accessToken, input);
        await refreshBooks();
        setIsAdding(false);
        return "";
      } catch (err) {
        setIsAdding(false);
        return "本の追加に失敗しました";
      }
    },
    [accessToken, refreshBooks]
  );

  const updateBook = useCallback(
    async (id: number, input: Partial<NewBookInput>) => {
      try {
        const data = await putBook(accessToken, id, input);
        await refreshBooks();
        return "";
      } catch (err) {
        return "本の更新に失敗しました";
      }
    },
    [accessToken, refreshBooks]
  );

  const removeBook = useCallback(
    async (id: number) => {
      setIsRemoving(true);
      try {
        await deleteBook(accessToken, id);
        await refreshBooks();
        setIsRemoving(false);
      } catch (err) {
        setIsRemoving(false);
      }
    },
    [accessToken, refreshBooks]
  );

  return {
    isLoading,
    isAdding,
    isRemoving,
    books,
    getBooks,
    refreshBooks,
    addBook,
    updateBook,
    removeBook,
  };
}