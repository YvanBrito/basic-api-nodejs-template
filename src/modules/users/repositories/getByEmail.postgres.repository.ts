import { AppDataSource } from '@/data-source'
import { User } from '@/modules/users/entity/User'
import { IUser } from '@/modules/users/types'
import { IGetByEmailRepository } from '../../auth/types'

export class GetByEmailPostgresRepository implements IGetByEmailRepository {
  private userRepository = AppDataSource.getRepository(User)

  async getByEmail(email: string): Promise<IUser | null> {
    return await this.userRepository.findOneBy({
      email,
    })
  }
}
