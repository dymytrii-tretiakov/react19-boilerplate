import type { IBookRepository } from "../../domain/repositories/IBookRepository";
import type { IBookService } from "../../domain/services/IBookService";
import type { INotificationService } from "../../domain/services/INotificationService";
import type { IBookStore } from "../../domain/stores/IBookStore";

class BookService implements IBookService {
  private bookRepository: IBookRepository;
  private bookStore: IBookStore;
  private notificationService: INotificationService;

  constructor(
    bookRepository: IBookRepository,
    bookStore: IBookStore,
    notificationService: INotificationService
  ) {
    this.bookRepository = bookRepository;
    this.bookStore = bookStore;
    this.notificationService = notificationService;
  }

  async loadAllBooks(): Promise<void> {
    try {
      const books = await this.bookRepository.getBooks();
      this.bookStore.setBooks(books);
    } catch (error) {
      this.notificationService.handleError(
        error,
        "notification",
        "loadAllBooks"
      );
      throw error;
    }
  }
}

export { BookService };
