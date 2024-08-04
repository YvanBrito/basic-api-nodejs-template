import { MockUserRepository } from '@/modules/users/mocks/mockUserRepo';
import { SignUpController } from './signup.controller';
import { SignUpService } from '../services/signup.service';

const mockedUser = {
  firstName: 'Joao',
  lastName: 'Silva',
  age: 57,
  birthday: '1996-01-26T12:00:00Z',
  email: 'joao@test.com',
  password: '',
};

describe('SignUpController', () => {
  let signUpController: SignUpController;
  beforeEach(() => {
    signUpController = new SignUpController(
      new SignUpService(new MockUserRepository([])),
    );
  });

  it('should 200 with an array of users', async () => {
    const { statusCode } = await signUpController.signup(mockedUser);
    expect(statusCode).toEqual(200);
  });
});
