import { IUserRepository } from '@/modules/users/repositories/user.postgres.repository'
import { User } from '@/modules/users/services/user.service'
import { NotFoundError } from '@/utils/errors'

export class MockUserRepository implements IUserRepository {
  private users: User[]
  constructor(_users: User[]) {
    this.users = _users
  }
  async getAll(): Promise<User[]> {
    return this.users
  }
  async getById(id: string): Promise<User> {
    const foundUser = this.users.find((user) => user.id.toString() === id)
    if (!foundUser) throw new NotFoundError('Usuário não encontrado')

    return foundUser
  }
}
