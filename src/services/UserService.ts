import { IUserRepository, UserRepository } from "@/repositories/UserRepo";

export interface User {
  id: number;
  name: string;
}

export interface IUserService {
  getUsers: () => Promise<User[]>;
  getById: (id: string) => Promise<
    | User
    | {
        statusCode: number;
        message: string;
      }
  >;
}

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}
  async getUsers(): Promise<User[]> {
    return await this.userRepository.getAll();
  }
  async getById(id: string): Promise<
    | User
    | {
        statusCode: number;
        message: string;
      }
  > {
    return await this.userRepository.getById(id);
  }
}

export const userService = new UserService(new UserRepository());
