import { User } from "@/services/UserService";
import { NotFoundError } from "@utils/errors";

export interface IUserRepository {
  getAll: () => Promise<User[]>;
  getById: (id: string) => Promise<User>;
}

export class UserRepository implements IUserRepository {
  private users: User[] = [
    {
      id: 1,
      name: "Joao",
    },
    {
      id: 2,
      name: "Sabrina",
    },
  ];
  async getAll(): Promise<User[]> {
    return this.users;
  }
  async getById(id: string): Promise<User> {
    const foundUser = this.users.find((user) => user.id.toString() === id);
    if (!foundUser) throw new NotFoundError("Usuário não encontrado");

    return foundUser;
  }
}
