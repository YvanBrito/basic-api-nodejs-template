import { UserRepository } from '@/modules/users/repositories/user.postgres.repository';
import { IUser, IUserRepository, IGetUserByIdService } from '../types';
import { NotFoundError } from '@/utils/errors';

export class GetUserByIdService implements IGetUserByIdService {
  constructor(public userRepository: IUserRepository) {}

  async execute(id: string): Promise<IUser> {
    const foundUser = await this.userRepository.getById(id);
    if (!foundUser) throw new NotFoundError('Usuário não encontrado');

    return foundUser as IUser;
  }
}

export const getUserByIdService = new GetUserByIdService(new UserRepository());
