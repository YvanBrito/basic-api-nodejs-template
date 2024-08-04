import { MockUserRepository } from '@/modules/users/mocks/mockUserRepo';
import { IUser } from '@/modules/users/types';
import { GetAllUsersController } from './get-all-users.controller';
import { GetAllUsersService } from '../services/get-all-users.service';

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
describe('GetAllUsersController', () => {
  let getAllUsersController: GetAllUsersController;
  beforeEach(() => {
    getAllUsersController = new GetAllUsersController(
      new GetAllUsersService(new MockUserRepository(usersMocked)),
    );
  });

  it('should 200 with an array of users', async () => {
    const { statusCode, body } = await getAllUsersController.execute();
    expect(statusCode).toEqual(200);
    expect(body).toEqual(usersMocked);
  });
});
