import { Book, NewBookInput } from "../entities";
import { fetcher } from "./cli/client";

type Resp = {
  getBookList: ReadonlyArray<Book>;
  getBook: Book;
  postBook: Book;
  putBook: Book;
  deleteBook: void;
};


export async function getBookList(accessToken: string) {
  return await fetcher.fetchJson<Resp["getBookList"]>({
    method: "GET",
    path: `/books`,
    accessToken,
  });
}

export async function getBook(accessToken: string, id: number) {
  return await fetcher.fetchJson<Resp["getBook"]>({
    method: "GET",
    path: `/books/${id}`,
    accessToken,
  });
}

export async function postBook(accessToken: string, input: NewBookInput) {
  return await fetcher.fetchJson<Resp["postBook"]>({
    method: "POST",
    path: `/books`,
    accessToken,
    body: { input },
  });
}

export async function putBook(accessToken: string, id: number, input: Partial<NewBookInput>) {
  return await fetcher.fetchJson<Resp["putBook"]>({
    method: "PUT",
    path: `/books/${id}`,
    accessToken,
    body: { input },
  });
}

export async function deleteBook(accessToken: string, id: number) {
  await fetcher.fetchJson<Resp["deleteBook"]>({
    method: "DELETE",
    path: `/books/${id}`,
    accessToken,
  });
}