import { NotFoundError } from '@/utils/errors'
import { IUser, IUserRepository } from '../types'

export class MockUserRepository implements IUserRepository {
  private users: IUser[]
  constructor(_users: IUser[]) {
    this.users = _users
  }

  async create(user: IUser): Promise<IUser> {
    return user
  }

  async getAll(): Promise<IUser[]> {
    return this.users
  }

  async getById(id: string): Promise<IUser> {
    const foundUser = this.users.find((user) => user.id?.toString() === id)
    if (!foundUser) throw new NotFoundError('Usuário não encontrado')

    return foundUser
  }

  async getByEmail(email: string): Promise<IUser> {
    const foundUser = this.users.find((user) => user.email.toString() === email)
    if (!foundUser) throw new NotFoundError('Usuário não encontrado')

    return foundUser
  }

  async save(user: IUser): Promise<IUser> {
    return user
  }
}
