import { userService } from "@/modules/users/services/user.service";
import { IUserService } from "../types";

class UserController {
  constructor(private userService: IUserService) {}

  async getUsers() {
    const users = await this.userService.getAll();
    return {
      statusCode: 200,
      body: users,
    };
  }

  async getById(id: string) {
    const user = await this.userService.getById(id);
    return {
      statusCode: 200,
      body: user,
    };
  }
}

const userController = new UserController(userService);

export { UserController, userController };
