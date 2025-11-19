import type { User } from "../models/User";

interface IUserRepository {
  getMe(): Promise<User>;
}

export type { IUserRepository };
