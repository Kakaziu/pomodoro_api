import { Router } from "express";
import { MongoCreatePomodoroRepository } from "../repositories/pomodoroRepositories/createPomodoro";
import { CreatePomodoroController } from "../controllers/PomodoroController/createPomodoro/createPomodoro";

const routes = Router();

routes.post("/", async (req, res) => {
  const mongoCreatePomodoroRepository = new MongoCreatePomodoroRepository();
  const createPomodoroController = new CreatePomodoroController(
    mongoCreatePomodoroRepository
  );

  const { statusCode, body } = await createPomodoroController.handle({
    body: req.body,
  });

  return res.status(statusCode).json(body);
});

export default routes;
