import { signUpService } from '../services/signup.service'
import { ISignUpService, createUserRequest } from '../types'

class SignUpController {
  constructor(private signUpService: ISignUpService) {}

  async signup(user: createUserRequest) {
    const newUser = await this.signUpService.signup(user)
    return {
      statusCode: 200,
      body: newUser,
    }
  }
}

const signUpController = new SignUpController(signUpService)

export { SignUpController, signUpController }
