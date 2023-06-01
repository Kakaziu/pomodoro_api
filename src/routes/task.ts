import { Router } from "express";
import { MongoCreateTaskRepository } from "../repositories/taskRepositories/createTask";
import { CreateTaskController } from "../controllers/TaskController/createTask";

const routes = Router();

routes.post("/:id", async (req, res) => {
  const mongoCreateTaskRepository = new MongoCreateTaskRepository();
  const createTaskController = new CreateTaskController(
    mongoCreateTaskRepository
  );

  const { statusCode, body } = await createTaskController.handle({
    params: req.params,
    body: req.body,
  });

  return res.status(statusCode).json(body);
});

export default routes;
