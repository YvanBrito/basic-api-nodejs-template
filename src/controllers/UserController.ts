import { IUserService, userService } from "@/services/UserService";
import { NotFoundError } from "@/utils/errors";

class UserController {
  constructor(private userService: IUserService) {}

  async getUsers() {
    const users = await this.userService.getUsers();
    return {
      statusCode: 200,
      body: users,
    };
  }

  async getById(id: string) {
    try {
      const user = await this.userService.getById(id);
      return {
        statusCode: 200,
        body: user,
      };
    } catch (error: unknown) {
      if (error instanceof NotFoundError)
        return {
          statusCode: error.statusCode,
          body: error.message,
        };
      return {
        statusCode: 500,
        body: "Internal server error",
      };
    }
  }
}

const userController = new UserController(userService);

export { UserController, userController };
