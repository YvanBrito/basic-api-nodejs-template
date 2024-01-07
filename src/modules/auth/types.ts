import { IUser } from '../users/types'

export interface createUserRequest {
  firstName: string
  lastName: string
  email: string
  age: number
  birthday: string
  password: string
}

export interface ISignUpService {
  signup: (user: createUserRequest) => Promise<IUser>
}

export interface IGetByEmailRepository {
  getByEmail: (email: string) => Promise<IUser | null>
}

export interface ISaveUserRepository {
  save: (user: IUser) => Promise<IUser>
}
