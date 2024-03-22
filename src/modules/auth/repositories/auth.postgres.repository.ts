import { AppDataSource } from "@/data-source";
import { User } from "@/modules/users/entity/User";
import { IUser } from "@/modules/users/types";
import { IAuthRepository } from "../types";

export class AuthPostgresRepository implements IAuthRepository {
  private userRepository = AppDataSource.getRepository(User);

  async save(user: IUser): Promise<IUser> {
    return await this.userRepository.save(user);
  }
}
