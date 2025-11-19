interface IBookService {
  loadAllBooks(): Promise<void>;
}

export type { IBookService };
