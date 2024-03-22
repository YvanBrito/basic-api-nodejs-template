export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  birthday: Date;
  hashed_password: string;
  salt: string;
  created_at?: Date;
  deleted_at?: Date;
  updated_at?: Date;
}

export interface IUserService {
  getAll: () => Promise<IUser[]>;
  getById: (id: string) => Promise<IUser>;
}

export interface IUserRepository {
  getAll: () => Promise<IUser[]>;
  getById: (id: string) => Promise<IUser | null>;
  getByEmail: (email: string) => Promise<IUser | null>;
}
