import { useCallback, useMemo, useRef, useSyncExternalStore } from "react";
import { InMemoryBookRepository, HttpBookRepository, BookRepository } from "../repositories/book";
import { getApiBaseUrl, getDataSource } from "../utils/config";
import { Book, NewBookInput, BookId } from "../entities/book";

type Subscriber = () => void;

class BookStore {
  private repository: BookRepository;
  private books: Book[] = [];
  private subscribers: Set<Subscriber> = new Set();

  constructor(repository: BookRepository) {
    this.repository = repository;
  }

  subscribe = (cb: Subscriber) => {
    this.subscribers.add(cb);
    return () => this.subscribers.delete(cb);
  };

  private notify = () => {
    for (const cb of this.subscribers) cb();
  };

  getSnapshot = () => this.books;

  initialize = async () => {
    this.books = await this.repository.list();
    this.notify();
  };

  add = async (input: NewBookInput) => {
    const created = await this.repository.add(input);
    this.books = [created, ...this.books];
    this.notify();
  };

  update = async (id: BookId, input: Partial<NewBookInput>) => {
    const updated = await this.repository.update(id, input);
    this.books = this.books.map((b) => (b.id === id ? updated : b));
    this.notify();
  };

  remove = async (id: BookId) => {
    await this.repository.remove(id);
    this.books = this.books.filter((b) => b.id !== id);
    this.notify();
  };
}

const createRepository = (): BookRepository => {
  const source = getDataSource();
  if (source === "http") {
    const base = getApiBaseUrl();
    console.log(`[BookRepo] dataSource=http baseUrl=${base}`);
    return new HttpBookRepository(base);
  }
  console.log(`[BookRepo] dataSource=memory`);
  return new InMemoryBookRepository();
};

const singletonStore = new BookStore(createRepository());

export function useBooks() {
  const storeRef = useRef(singletonStore);

  const subscribe = useCallback((cb: Subscriber) => storeRef.current.subscribe(cb), []);
  const getSnapshot = useCallback(() => storeRef.current.getSnapshot(), []);
  const books = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const actions = useMemo(
    () => ({
      initialize: storeRef.current.initialize,
      add: storeRef.current.add,
      update: storeRef.current.update,
      remove: storeRef.current.remove,
    }),
    []
  );

  return { books, ...actions };
}


