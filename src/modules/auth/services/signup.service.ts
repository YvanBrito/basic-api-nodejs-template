import { randomBytes, createHash } from 'node:crypto';
import { DuplicateError } from '@/utils/errors';
import { IUser, IUserRepository } from '@/modules/users/types';
import { ISignUpService, CreateUserRequest } from '../types';
import { UserRepository } from '@/modules/users/repositories';

export class SignUpService implements ISignUpService {
  constructor(public userRepository: IUserRepository) {}

  async execute(createUserRequest: CreateUserRequest): Promise<void> {
    const foundUser = await this.userRepository.getByEmail(
      createUserRequest.email,
    );
    if (foundUser) throw new DuplicateError('Usuário com este email já existe');

    const salt = randomBytes(16).toString('base64');
    const hashed_password = createHash('sha256')
      .update(createUserRequest.password)
      .update(createHash('sha256').update(salt, 'utf8').digest('hex'))
      .digest('hex');

    const newUser: IUser = {
      firstName: createUserRequest.firstName,
      lastName: createUserRequest.lastName,
      age: createUserRequest.age,
      birthday: new Date(createUserRequest.birthday),
      email: createUserRequest.email,
      hashed_password,
      salt,
    };
    await this.userRepository.save(newUser);
  }

  // async login(loginUserRequest: LoginUserRequest): Promise<LoginUserResponse> {

  // }
}

export const signUpService = new SignUpService(new UserRepository());
