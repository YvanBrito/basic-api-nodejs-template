import { authService } from '../services/auth.service'
import { IAuthService, CreateUserRequest } from '../types'

class AuthController {
  constructor(private authService: IAuthService) {}

  async signup(createUserRequest: CreateUserRequest) {
    await this.authService.signup(createUserRequest)
    return {
      statusCode: 200,
      body: '',
    }
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

const authController = new AuthController(authService)

export { AuthController, authController }
