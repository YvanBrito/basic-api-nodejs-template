import { randomBytes, createHash } from 'node:crypto'
import { DuplicateError } from '@/utils/errors'
import { IUser } from '@/modules/users/types'
import { GetByEmailPostgresRepository } from '@/modules/users/repositories'
import { SaveUserPostgresRepository } from '../repositories'
import {
  IGetByEmailRepository,
  ISaveUserRepository,
  ISignUpService,
  createUserRequest,
} from '../types'

export class SignUpService implements ISignUpService {
  constructor(
    public saveUserRepository: ISaveUserRepository,
    public getByEmailRepository: IGetByEmailRepository,
  ) {}

  async signup(user: createUserRequest): Promise<IUser> {
    const foundUser = await this.getByEmailRepository.getByEmail(user.email)
    if (foundUser) throw new DuplicateError('Usuário com este email já existe')

    const salt = randomBytes(16).toString('base64')
    const hashed_password = createHash('sha256')
      .update(user.password)
      .update(createHash('sha256').update(salt, 'utf8').digest('hex'))
      .digest('hex')

    const newUser: IUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      birthday: new Date(user.birthday),
      email: user.email,
      hashed_password,
      salt,
    }
    return await this.saveUserRepository.save(newUser)
  }
}

export const signUpService = new SignUpService(
  new SaveUserPostgresRepository(),
  new GetByEmailPostgresRepository(),
)
