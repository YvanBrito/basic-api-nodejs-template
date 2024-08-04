export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  birthday: string;
  password: string;
}

export interface LoginUserRequest {
  id: number;
  email: string;
}

export interface LoginUserResponse {
  token: string;
}

export interface ISignUpService {
  execute: (user: CreateUserRequest) => Promise<void>;
}

export interface ILoginService {
  execute: (user: LoginUserRequest) => Promise<LoginUserResponse>;
}
