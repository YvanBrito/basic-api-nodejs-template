import { loginService } from '../services/login.service';
import { ILoginService, LoginUserRequest, LoginUserResponse } from '../types';

class LoginController {
  constructor(private loginService: ILoginService) {}

  async execute(loginUserRequest: LoginUserRequest) {
    const body: LoginUserResponse =
      await this.loginService.execute(loginUserRequest);
    return {
      statusCode: 200,
      body,
    };
  }
}

const loginController = new LoginController(loginService);

export { LoginController, loginController };
