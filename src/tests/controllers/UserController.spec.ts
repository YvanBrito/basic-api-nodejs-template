import { UserController } from '@/modules/users/controllers/user.controller'
import { MockUserRepository } from '@/modules/users/mocks/mockUserRepo'
import { UserService } from '@/modules/users/services/user.service'
import { IUser } from '@/modules/users/types'

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
]
describe('UsersController', () => {
  let userController: UserController
  beforeEach(() => {
    userController = new UserController(
      new UserService(new MockUserRepository(usersMocked)),
    )
  })

  it('should 200 with an array of users', async () => {
    const { statusCode, body } = await userController.getUsers()
    expect(statusCode).toEqual(200)
    expect(body).toEqual(usersMocked)
  })

  it('should return user by id', async () => {
    const { statusCode, body } = await userController.getById('1')
    expect(statusCode).toEqual(200)
    expect(body).toEqual(usersMocked[0])
  })

  it('should return 404 error with a message', async () => {
    const { statusCode, body } = await userController.getById('3')
    expect(statusCode).toEqual(404)
    expect(body).toEqual('Usuário não encontrado')
  })
})
