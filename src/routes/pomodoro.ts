import { Router } from "express";
import { MongoCreatePomodoroRepository } from "../repositories/pomodoroRepositories/createPomodoro";
import { CreatePomodoroController } from "../controllers/PomodoroController/createPomodoro/createPomodoro";
import loginRequired from "../middlewares/loginRequired";
import { MongoUpdatePomodoroRepository } from "../repositories/pomodoroRepositories/updatePomodoro";
import { UpdatePomodoroController } from "../controllers/PomodoroController/updatePomodoro/updatePomodoro";
import { MongoGetPomodorosRepository } from "../repositories/pomodoroRepositories/getPomodoros";
import { GetPomodorosController } from "../controllers/PomodoroController/getPomodoros/getPomodoros";

const routes = Router();

routes.get("/", loginRequired, async (req, res) => {
  const mongoGetPomodorosRepository = new MongoGetPomodorosRepository();
  const getPomodorosController = new GetPomodorosController(
    mongoGetPomodorosRepository
  );

  const { statusCode, body } = await getPomodorosController.handle({});

  return res.status(statusCode).json(body);
});

routes.post("/", loginRequired, async (req, res) => {
  const mongoCreatePomodoroRepository = new MongoCreatePomodoroRepository();
  const createPomodoroController = new CreatePomodoroController(
    mongoCreatePomodoroRepository
  );

  const { createBy, ...rest } = req.body;
  const bodyWithUserId = { createBy: req.userId, ...rest };

  const { statusCode, body } = await createPomodoroController.handle({
    body: bodyWithUserId,
  });

  return res.status(statusCode).json(body);
});

routes.patch("/:id", loginRequired, async (req, res) => {
  const mongoUpdatePomodoroRepository = new MongoUpdatePomodoroRepository();
  const updatePomodoroController = new UpdatePomodoroController(
    mongoUpdatePomodoroRepository
  );

  const { statusCode, body } = await updatePomodoroController.handle({
    params: req.params,
    body: req.body,
  });

  return res.status(statusCode).json(body);
});

export default routes;
