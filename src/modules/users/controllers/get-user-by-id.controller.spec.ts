import { NotFoundError } from '@/utils/errors';
import { MockUserRepository } from '../mocks/mockUserRepo';
import { GetUserByIdService } from '../services/get-user-by-id.service';
import { GetUserByIdController } from './get-user-by-id.controller';
import { IUser } from '../types';

const usersMocked: IUser[] = [
  {
    id: 1,
    firstName: 'Joao',
    lastName: 'Silva',
    age: 57,
    birthday: new Date('1996-01-26T12:00:00Z'),
    email: 'joao@test.com',
    created_at: new Date(),
    deleted_at: new Date(),
    updated_at: new Date(),
    hashed_password: 'dwojsdiojs',
    salt: 'werwerer',
  },
  {
    id: 2,
    firstName: 'Sabrina',
    lastName: 'Silva',
    age: 57,
    birthday: new Date('1996-01-26T12:00:00Z'),
    email: 'sabrina@test.com',
    created_at: new Date(),
    deleted_at: new Date(),
    updated_at: new Date(),
    hashed_password: 'dwojsdiojs',
    salt: 'werwerer',
  },
];
describe('GetUserByIdController', () => {
  let getUserByIdController: GetUserByIdController;
  beforeEach(() => {
    getUserByIdController = new GetUserByIdController(
      new GetUserByIdService(new MockUserRepository(usersMocked)),
    );
  });

  it('should return user by id', async () => {
    const { statusCode, body } = await getUserByIdController.execute('1');
    expect(statusCode).toEqual(200);
    expect(body).toEqual(usersMocked[0]);
  });

  it('should return 404 error with a message', async () => {
    await expect(getUserByIdController.execute('3')).rejects.toEqual(
      new NotFoundError('Usuário não encontrado'),
    );
  });
});
