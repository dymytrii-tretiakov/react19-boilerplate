import type { Book } from "../models/Book";

interface IBookRepository {
  getBooks(): Promise<Book[]>;
}

export type { IBookRepository };
