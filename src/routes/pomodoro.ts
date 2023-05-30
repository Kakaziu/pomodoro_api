import { Router } from "express";
import { MongoCreatePomodoroRepository } from "../repositories/pomodoroRepositories/createPomodoro";
import { CreatePomodoroController } from "../controllers/PomodoroController/createPomodoro/createPomodoro";
import loginRequired from "../middlewares/loginRequired";

const routes = Router();

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

export default routes;
