import { AppDataSource } from '@/data-source'
import { User } from '@/modules/users/entity/User'
import { IUser } from '@/modules/users/types'
import { ISaveUserRepository } from '../types'

export class SaveUserPostgresRepository implements ISaveUserRepository {
  private userRepository = AppDataSource.getRepository(User)

  async save(user: IUser): Promise<IUser> {
    return await this.userRepository.save(user)
  }
}
