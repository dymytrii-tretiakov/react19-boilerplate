import type { Axios } from "axios";
import type { User } from "../../domain/models/User";
import type { IUserRepository } from "../../domain/repositories/IUserRepository";

function UserRepositoryImpl(api: Axios): IUserRepository {
  async function getMe(): Promise<User> {
    const response = await api.get<User>("/me");
    return response.data;
  }

  return {
    getMe,
  };
}

export { UserRepositoryImpl };
