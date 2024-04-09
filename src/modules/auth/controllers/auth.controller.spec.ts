import { MockUserRepository } from '@/modules/users/mocks/mockUserRepo';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';

const mockedUser = {
  firstName: 'Joao',
  lastName: 'Silva',
  age: 57,
  birthday: '1996-01-26T12:00:00Z',
  email: 'joao@test.com',
  password: '',
};

describe('AuthController', () => {
  let authController: AuthController;
  beforeEach(() => {
    authController = new AuthController(
      new AuthService(new MockUserRepository([])),
    );
  });

  it('should 200 with an array of users', async () => {
    const { statusCode } = await authController.signup(mockedUser);
    expect(statusCode).toEqual(200);
  });
});
