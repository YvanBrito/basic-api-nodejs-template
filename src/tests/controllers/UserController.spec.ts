import { MockUserRepository } from "@/mocks/mockUserRepo";
import { UserController } from "@/controllers/UserController";
import { UserService } from "@/services/UserService";

const usersMocked = [
  {
    id: 1,
    name: "Joao",
  },
  {
    id: 2,
    name: "Sabrina",
  },
];
describe("UsersController", () => {
  let userController: UserController;
  beforeEach(() => {
    userController = new UserController(
      new UserService(new MockUserRepository(usersMocked)),
    );
  });

  it("should 200 with an array of users", async () => {
    const { statusCode, body } = await userController.getUsers();
    expect(statusCode).toEqual(200);
    expect(body).toEqual(usersMocked);
  });

  it("should return user by id", async () => {
    const { statusCode, body } = await userController.getById("1");
    expect(statusCode).toEqual(200);
    expect(body).toEqual(usersMocked[0]);
  });

  it("should return 404 error with a message", async () => {
    const { statusCode, body } = await userController.getById("3");
    expect(statusCode).toEqual(404);
    expect(body).toEqual("Usuário não encontrado");
  });
});
