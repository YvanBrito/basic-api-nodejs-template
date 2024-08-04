import { Router } from 'express';
import { getAllUsersController } from './controllers/get-all-users.controller';
import { getUserByIdController } from './controllers/get-user-by-id.controller';

const userRoutes = Router();

userRoutes.get('/users', async (req, res) => {
  const { statusCode, body } = await getAllUsersController.execute();
  res.status(statusCode).json(body);
});

userRoutes.get('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { statusCode, body } = await getUserByIdController.execute(id);
    res.status(statusCode).json(body);
  } catch (err: unknown) {
    next(err);
  }
});

export default userRoutes;
