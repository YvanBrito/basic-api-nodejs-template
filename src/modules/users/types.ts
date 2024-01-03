export interface IUser {
  id: number
  firstName: string
  lastName: string
  age: number
  birthday: Date
  created_at: Date
  updated_at: Date
  deleted_at: Date
}

export interface IUserService {
  getAll: () => Promise<IUser[]>
  getById: (id: string) => Promise<IUser>
  create: (user: IUser) => Promise<IUser>
}

export interface IUserRepository {
  getAll: () => Promise<IUser[]>
  getById: (id: string) => Promise<IUser | null>
  create: (user: IUser) => Promise<IUser>
}
