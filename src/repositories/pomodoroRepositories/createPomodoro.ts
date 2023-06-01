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
    const setParams = {
      title: params.title,
      timeWorking: params.timeWorking,
      timeShortResting: params.timeShortResting,
      timeLongResting: params.timeLongResting,
      totalPomodoroCompleted: 0,
      totalTimePomodoro: 0,
      createBy: params.createBy,
      createdAt: Date.now(),
    };

    const { insertedId } = await MongoClient.db
      .collection("pomodoros")
      .insertOne(setParams);

    const pomodoro = await MongoClient.db
      .collection<OmitId<Pomodoro>>("pomodoros")
      .findOne({ _id: insertedId });

    if (!pomodoro) throw new Error("Pomodoro not created");

    const { _id, ...rest } = pomodoro;

    return { id: _id.toHexString(), ...rest };
  }
}
