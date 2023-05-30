import { Router } from "express";
import { MongoGetUserByEmailRepository } from "../repositories/userRepositories/getUser";
import { CreateTokenController } from "../controllers/TokenController/createToken/createToken";

const routes = Router();

routes.post("/", async (req, res) => {
  const mongoGetUserRepository = new MongoGetUserByEmailRepository();
  const tokenController = new CreateTokenController(mongoGetUserRepository);

  const { statusCode, body } = await tokenController.handle({
    body: req.body,
  });

  if ("message" in body) return res.status(statusCode).json(body);

  res.header("authorization", body.token);
  return res.status(statusCode).json(body);
});

export default routes;
