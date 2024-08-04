import { signUpService } from '../services/signup.service';
import { ISignUpService, CreateUserRequest } from '../types';

class SignUpController {
  constructor(private signupService: ISignUpService) {}

  async signup(createUserRequest: CreateUserRequest) {
    await this.signupService.execute(createUserRequest);
    return {
      statusCode: 200,
      body: '',
    };
  }

  // async login(loginUserRequest: LoginUserRequest) {
  //   const body: LoginUserResponse =
  //     await this.authService.login(loginUserRequest)
  //   return {
  //     statusCode: 200,
  //     body,
  //   }
  // }
}

const signUpController = new SignUpController(signUpService);

export { SignUpController, signUpController };
