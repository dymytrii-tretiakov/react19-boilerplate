import { BookRepositoryImpl } from "../application/repositories/BookRepositoryImpl";
import { UserRepositoryImpl } from "../application/repositories/UserRepositoryImpl";
import { BookService } from "../application/services/BookService";
import { NotificationService } from "../application/services/NotificationService";
import { UserService } from "../application/services/UserService";
import type { IStoreFactory } from "../domain/factories/IStoreFactory";
import type { IBookService } from "../domain/services/IBookService";
import type { INotificationService } from "../domain/services/INotificationService";
import type { IUserService } from "../domain/services/IUserService";
import { api } from "./api";
import { storeFactory } from "./factories/StoreFactory";

class DIContainer {
  private static instances: DIContainer;

  // Dependency instances
  private _notificationService: INotificationService | null = null;
  private _userService: IUserService | null = null;
  private _bookService: IBookService | null = null;
  private _storeFactory: IStoreFactory | null = null;

  private constructor() {}

  public static getInstance(): DIContainer {
    if (!DIContainer.instances) {
      DIContainer.instances = new DIContainer();
    }
    return DIContainer.instances;
  }

  // Getters for dependencies
  get storeFactory(): IStoreFactory {
    if (!this._storeFactory) {
      this._storeFactory = storeFactory;
    }
    return this._storeFactory;
  }

  get notificationService(): INotificationService {
    if (!this._notificationService) {
      this._notificationService = new NotificationService(
        storeFactory.createNotificationStore()
      );
    }
    return this._notificationService;
  }

  get userService(): IUserService {
    if (!this._userService) {
      this._userService = new UserService(
        UserRepositoryImpl(api),
        storeFactory.createUserStore(),
        this.notificationService
      );
    }
    return this._userService;
  }

  get bookService(): IBookService {
    if (!this._bookService) {
      this._bookService = new BookService(
        BookRepositoryImpl(api),
        storeFactory.createBookStore(),
        this.notificationService
      );
    }
    return this._bookService;
  }
}

export const container = DIContainer.getInstance();
