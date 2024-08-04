import jwt from 'jsonwebtoken';
import { IUserRepository } from '@/modules/users/types';
import { UserRepository } from '@/modules/users/repositories';
import { ILoginService, LoginUserRequest, LoginUserResponse } from '../types';

export class LoginService implements ILoginService {
  constructor(public userRepository: IUserRepository) {}

  async execute({ id, email }: LoginUserRequest): Promise<LoginUserResponse> {
    const token = jwt.sign(
      { user: { id, email } },
      process.env.TOKEN_SECRET ?? '',
    );

    return { token };
  }
}

export const loginService = new LoginService(new UserRepository());
