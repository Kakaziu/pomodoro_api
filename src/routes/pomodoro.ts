import { Router } from "express";
import { MongoCreatePomodoroRepository } from "../repositories/pomodoroRepositories/createPomodoro";
import { CreatePomodoroController } from "../controllers/PomodoroController/createPomodoro/createPomodoro";
import loginRequired from "../middlewares/loginRequired";
import { MongoUpdatePomodoroRepository } from "../repositories/pomodoroRepositories/updatePomodoro";
import { UpdatePomodoroController } from "../controllers/PomodoroController/updatePomodoro/updatePomodoro";
import { MongoGetPomodorosRepository } from "../repositories/pomodoroRepositories/getPomodoros";
import { GetPomodorosController } from "../controllers/PomodoroController/getPomodoros/getPomodoros";
import { GetPomodoroController } from "../controllers/PomodoroController/getPomodoro/getPomodoro";
import { MongoGetPomodoroRepository } from "../repositories/pomodoroRepositories/getPomodoro";
import { MongoDeletePomodoroRepository } from "../repositories/pomodoroRepositories/deletePomodoro";
import { DeletePomodoroController } from "../controllers/PomodoroController/deletePomodoro/deletePomodoro";

const routes = Router();

routes.get("/", loginRequired, async (req, res) => {
  const mongoGetPomodorosRepository = new MongoGetPomodorosRepository();
  const getPomodorosController = new GetPomodorosController(
    mongoGetPomodorosRepository
  );

  const { statusCode, body } = await getPomodorosController.handle();

  if ("message" in body) return;

  const userPomodoros = body.filter(
    (pomodoro) => pomodoro.createBy === req.userId
  );

  return res.status(statusCode).json(userPomodoros);
});

routes.post("/", loginRequired, async (req, res) => {
  const mongoCreatePomodoroRepository = new MongoCreatePomodoroRepository();
  const createPomodoroController = new CreatePomodoroController(
    mongoCreatePomodoroRepository
  );

  const bodyWithUserId = { createBy: req.userId, ...req.body };

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

routes.delete("/:id", loginRequired, async (req, res) => {
  const mongoDeletePomodoroRepository = new MongoDeletePomodoroRepository();
  const deletePomodoroController = new DeletePomodoroController(
    mongoDeletePomodoroRepository
  );

  const { statusCode, body } = await deletePomodoroController.handle({
    params: req.params,
  });

  return res.status(statusCode).json(body);
});

routes.get("/:id", loginRequired, async (req, res) => {
  const mongoGetPomodoroRepository = new MongoGetPomodoroRepository();
  const getPomodoroController = new GetPomodoroController(
    mongoGetPomodoroRepository
  );

  const { statusCode, body } = await getPomodoroController.handle({
    params: req.params,
  });

  return res.status(statusCode).json(body);
});

export default routes;
