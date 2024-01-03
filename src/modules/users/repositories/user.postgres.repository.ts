import { IUser, IUserRepository } from '../types'
import { AppDataSource } from '@/data-source'
import { User } from '../entity/User'

export class UserPostgresRepository implements IUserRepository {
  private userRepository = AppDataSource.getRepository(User)

  async getAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async getById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({
      id: Number(id),
    })
  }

  async create(user: IUser): Promise<User> {
    const newUser = new User()
    newUser.firstName = user.firstName
    newUser.lastName = user.lastName
    newUser.age = user.age
    newUser.birthday = user.birthday
    return await this.userRepository.save(newUser)
  }
}
