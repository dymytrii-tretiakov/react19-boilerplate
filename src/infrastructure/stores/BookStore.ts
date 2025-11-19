import { create } from "zustand";
import type { IBookStore } from "../../domain/stores/IBookStore";

const useBookStore = create<IBookStore>((set) => ({
  isLoading: false,
  books: [],
  setBooks: (books) => set({ books }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export { useBookStore };
