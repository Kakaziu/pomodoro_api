import {
  CreatePomodoroParams,
  ICreatePomodoroRepository,
} from "../../controllers/PomodoroController/createPomodoro/protocol";
import { OmitId } from "../../controllers/protocol";
import { MongoClient } from "../../database/mongo";
import { Pomodoro } from "../../models/Pomodoro";

export class MongoCreatePomodoroRepository
  implements ICreatePomodoroRepository
{
  async createPomodoro(params: CreatePomodoroParams): Promise<Pomodoro> {
    const { insertedId } = await MongoClient.db
      .collection("pomodoros")
      .insertOne(params);

    const pomodoro = await MongoClient.db
      .collection<OmitId<Pomodoro>>("pomodoros")
      .findOne({ _id: insertedId });

    if (!pomodoro) throw new Error("Pomodoro not created");

    const { _id, totalTimePomodoro, ...rest } = pomodoro;

    return { id: _id.toHexString(), totalTimePomodoro: 0, ...rest };
  }
}
