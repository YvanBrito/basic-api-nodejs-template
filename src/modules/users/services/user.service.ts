import { UserPostgresRepository } from '@/modules/users/repositories/user.postgres.repository'
import { IUser, IUserRepository, IUserService } from '../types'
import { NotFoundError } from '@/utils/errors'

export class UserService implements IUserService {
  constructor(public userRepository: IUserRepository) {}
  async getAll(): Promise<IUser[]> {
    return await this.userRepository.getAll()
  }

  async getById(id: string): Promise<IUser> {
    const foundUser = await this.userRepository.getById(id)
    if (!foundUser) throw new NotFoundError('Usuário não encontrado')

    return foundUser as IUser
  }

  async create(user: IUser): Promise<IUser> {
    return await this.userRepository.create(user)
  }
}

export const userService = new UserService(new UserPostgresRepository())
