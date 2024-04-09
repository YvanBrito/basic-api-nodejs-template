import { IUser, IUserRepository } from '../types';
import { AppDataSource } from '@/data-source';
import { User } from '../entity/User';

export class UserRepository implements IUserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async save(user: IUser): Promise<IUser> {
    return await this.userRepository.save(user);
  }

  async getAll(): Promise<IUser[]> {
    return await this.userRepository.find();
  }

  async getById(id: string): Promise<IUser | null> {
    return await this.userRepository.findOneBy({
      id: Number(id),
    });
  }

  async getByEmail(email: string): Promise<IUser | null> {
    return await this.userRepository.findOneBy({
      email,
    });
  }
}
