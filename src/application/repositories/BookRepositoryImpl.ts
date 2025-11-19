import type { Axios } from "axios";
import type { Book } from "../../domain/models/Book";
import type { IBookRepository } from "../../domain/repositories/IBookRepository";

function BookRepositoryImpl(api: Axios): IBookRepository {
  async function getBooks(): Promise<Book[]> {
    const response = await api.get<Book[]>("/books");
    return response.data;
  }

  return {
    getBooks,
  };
}

export { BookRepositoryImpl };
