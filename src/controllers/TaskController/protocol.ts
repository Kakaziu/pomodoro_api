import { Task } from "../../models/Task";
import { HttpRequest, HttpResponse, ResponseBodyError } from "../protocol";

export interface CreateTaskParams {
  title: string;
  createFor: string;
}

export interface ICreateTaskController {
  handle(
    httpRequest: HttpRequest<CreateTaskParams>
  ): Promise<HttpResponse<Task | ResponseBodyError>>;
}

export interface ICreateTaskRepository {
  createTask(params: CreateTaskParams): Promise<Task>;
}
