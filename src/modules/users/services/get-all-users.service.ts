import { UserRepository } from '@/modules/users/repositories/user.postgres.repository';
import { IUser, IUserRepository, IGetAllUsersService } from '../types';

export class GetAllUsersService implements IGetAllUsersService {
  constructor(public userRepository: IUserRepository) {}
  async execute(): Promise<IUser[]> {
    return await this.userRepository.getAll();
  }
}

export const getAllUsersService = new GetAllUsersService(new UserRepository());
