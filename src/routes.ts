import { Router } from "express";
import { userController } from "@/controllers";

const routes = Router();

routes.get("/users", async (req, res) => {
  const { statusCode, body } = await userController.getUsers();
  res.status(statusCode).json(body);
});

routes.get("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { statusCode, body } = await userController.getById(id);
    res.status(statusCode).json(body);
  } catch (err: unknown) {
    next(err);
  }
});

export default routes;
