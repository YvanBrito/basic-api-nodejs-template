import { getAllUsersService } from '../services/get-all-users.service';
import { IGetAllUsersService } from '../types';

class GetAllUsersController {
  constructor(private getAllUsersService: IGetAllUsersService) {}

  async execute() {
    const users = await this.getAllUsersService.execute();
    return {
      statusCode: 200,
      body: users,
    };
  }
}

const getAllUsersController = new GetAllUsersController(getAllUsersService);

export { GetAllUsersController, getAllUsersController };
