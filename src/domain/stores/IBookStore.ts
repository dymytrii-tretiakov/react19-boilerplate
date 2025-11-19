import type { Book } from "../models/Book";

type BookStoreState = {
  books: Book[];
  isLoading: boolean;
};

interface BookStoreActions {
  setBooks: (books: Book[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

type IBookStore = BookStoreState & BookStoreActions;

export type { IBookStore };
