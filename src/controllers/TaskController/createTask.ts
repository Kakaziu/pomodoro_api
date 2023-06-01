import {
  badRequest,
  created,
  serverError,
} from "../../helpers/responseFunctions";
import { Task } from "../../models/Task";
import { MongoCreateTaskRepository } from "../../repositories/taskRepositories/createTask";
import { HttpRequest, HttpResponse, ResponseBodyError } from "../protocol";
import { CreateTaskParams, ICreateTaskController } from "./protocol";

export class CreateTaskController implements ICreateTaskController {
  constructor(
    private readonly createTaskRepository: MongoCreateTaskRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<CreateTaskParams>
  ): Promise<HttpResponse<Task | ResponseBodyError>> {
    try {
      const body = httpRequest?.body;
      const pomodoroId = httpRequest?.params?.id;

      if (!body) return badRequest("Missing body");
      if (!pomodoroId) return badRequest("Missing Id");
      if (!body.title) return badRequest("Field Title is empty");

      const task = await this.createTaskRepository.createTask({
        title: body.title,
        createFor: pomodoroId,
      });

      return created<Task>(task);
    } catch (e) {
      return serverError();
    }
  }
}
