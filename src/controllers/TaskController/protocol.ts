import { Task } from "../../models/Task";

export interface CreateTaskParams {
  title: string;
  createFor: string;
}

export interface ICreateTaskRepository {
  createTask(params: CreateTaskParams): Promise<Task>;
}
