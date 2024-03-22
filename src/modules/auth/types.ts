import { IUser } from '../users/types';

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  birthday: string;
  password: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  token: string;
}

export interface IAuthService {
  signup: (user: CreateUserRequest) => Promise<void>;
  // login: (user: LoginUserRequest) => Promise<LoginUserResponse>
}

export interface IAuthRepository {
  save: (user: IUser) => Promise<IUser>;
}
