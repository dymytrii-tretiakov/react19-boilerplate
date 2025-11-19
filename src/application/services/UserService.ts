import type { IUserRepository } from "../../domain/repositories/IUserRepository";
import type { INotificationService } from "../../domain/services/INotificationService";
import type { IUserService } from "../../domain/services/IUserService";
import type { IUserStore } from "../../domain/stores/IUserStore";

class UserService implements IUserService {
  private userRepository: IUserRepository;
  private userStore: IUserStore;
  private notificationService: INotificationService;

  constructor(
    userRepository: IUserRepository,
    userStore: IUserStore,
    notificationService: INotificationService
  ) {
    this.userRepository = userRepository;
    this.userStore = userStore;
    this.notificationService = notificationService;
  }

  async loadMe(): Promise<void> {
    try {
      const user = await this.userRepository.getMe();
      this.userStore.setMe(user);
    } catch (error) {
      this.notificationService.handleError(error, "notification", "loadMe");
      throw error; // Re-throw if caller wants to handle it
    }
  }
}

export { UserService };
