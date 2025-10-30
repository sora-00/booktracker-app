import { Book, BookId, NewBookInput, createBook, updateBook } from "../entities/book";

export interface BookRepository {
  list(): Promise<Book[]>;
  getById(id: BookId): Promise<Book | undefined>;
  add(input: NewBookInput): Promise<Book>;
  update(id: BookId, input: Partial<NewBookInput>): Promise<Book>;
  remove(id: BookId): Promise<void>;
  clear(): Promise<void>;
}

export class InMemoryBookRepository implements BookRepository {
  private books: Map<BookId, Book> = new Map();

  async list(): Promise<Book[]> {
    return Array.from(this.books.values()).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  async getById(id: BookId): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async add(input: NewBookInput): Promise<Book> {
    const nowIso = new Date().toISOString();
    const id = generateId();
    const book = createBook(id, input, nowIso);
    this.books.set(id, book);
    return book;
  }

  async update(id: BookId, input: Partial<NewBookInput>): Promise<Book> {
    const target = this.books.get(id);
    if (!target) throw new Error("Book not found");
    const nowIso = new Date().toISOString();
    const updated = updateBook(target, input, nowIso);
    this.books.set(id, updated);
    return updated;
  }

  async remove(id: BookId): Promise<void> {
    this.books.delete(id);
  }

  async clear(): Promise<void> {
    this.books.clear();
  }
}

export class HttpBookRepository implements BookRepository {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  async list(): Promise<Book[]> {
    const res = await fetch(`${this.baseUrl}/api/books`);
    if (!res.ok) throw new Error(`Failed to fetch books: ${res.status}`);
    const data = await res.json();
    return (data as ReadonlyArray<Record<string, unknown>>).map(this.fromApi);
  }

  async getById(id: BookId): Promise<Book | undefined> {
    const res = await fetch(`${this.baseUrl}/api/books/${id}`);
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error(`Failed to fetch book: ${res.status}`);
    const data = await res.json();
    return this.fromApi(data as Record<string, unknown>);
  }

  async add(input: NewBookInput): Promise<Book> {
    const res = await fetch(`${this.baseUrl}/api/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: input.title, author: input.author }),
    });
    if (!res.ok) throw new Error(`Failed to create book: ${res.status}`);
    const data = await res.json();
    return this.fromApi(data as Record<string, unknown>);
  }

  async update(id: BookId, input: Partial<NewBookInput>): Promise<Book> {
    // API未対応なら未実装
    throw new Error("Not implemented on HTTP repository");
  }

  async remove(id: BookId): Promise<void> {
    const res = await fetch(`${this.baseUrl}/api/books/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Failed to delete book: ${res.status}`);
  }

  async clear(): Promise<void> { return; }

  private fromApi = (raw: Record<string, unknown>): Book => {
    // APIは {ID, Title, Author} で返すため両方に対応
    const idVal = (raw.id ?? raw.ID) as string | number | undefined;
    const titleVal = (raw.title ?? raw.Title) as string | undefined;
    const authorVal = (raw.author ?? raw.Author) as string | undefined;
    const nowIso = new Date().toISOString();
    return {
      id: String(idVal ?? ""),
      title: String(titleVal ?? ""),
      author: String(authorVal ?? ""),
      createdAt: nowIso,
      updatedAt: nowIso,
    };
  };
}
function generateId(): string {
  // React Native 環境で crypto.randomUUID が無い場合に備えた簡易ID
  // 一意性は十分ではないが、InMemory用途では問題ない
  try {
    // @ts-ignore
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      // @ts-ignore
      return crypto.randomUUID();
    }
  } catch (_) {}
  return `bk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}


