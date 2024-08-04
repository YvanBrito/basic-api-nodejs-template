import { getUserByIdService } from '../services/get-user-by-id.service';
import { IGetUserByIdService } from '../types';

class GetUserByIdController {
  constructor(private getUserByIdService: IGetUserByIdService) {}

  async execute(id: string) {
    const user = await this.getUserByIdService.execute(id);
    return {
      statusCode: 200,
      body: user,
    };
  }
}

const getUserByIdController = new GetUserByIdController(getUserByIdService);

export { GetUserByIdController, getUserByIdController };
