import { Router } from "express";
import { MongoCreateUserRepository } from "../repositories/userRepositories/createUser";
import { CreateUserController } from "../controllers/UserController/createUser/createUser";

const routes = Router();

routes.post("/", async (req, res) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository();
  const createUserController = new CreateUserController(
    mongoCreateUserRepository
  );

  const { statusCode, body } = await createUserController.handle({
    body: req.body,
  });

  return res.status(statusCode).json(body);
});

export default routes;
