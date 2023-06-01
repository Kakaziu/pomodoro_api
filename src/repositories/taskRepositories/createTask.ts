import {
  CreateTaskParams,
  ICreateTaskRepository,
} from "../../controllers/TaskController/protocol";
import { OmitId } from "../../controllers/protocol";
import { MongoClient } from "../../database/mongo";
import { Task } from "../../models/Task";

export class MongoCreateTaskRepository implements ICreateTaskRepository {
  async createTask(params: CreateTaskParams): Promise<Task> {
    const { insertedId } = await MongoClient.db
      .collection("tasks")
      .insertOne(params);

    const task = await MongoClient.db
      .collection<OmitId<Task>>("tasks")
      .findOne({ _id: insertedId });

    if (!task) throw new Error("Task not created");

    const { _id, ...rest } = task;

    return { id: _id.toHexString(), ...rest };
  }
}
