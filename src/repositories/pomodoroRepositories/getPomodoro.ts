import { ObjectId } from "mongodb";
import { IGetPomodoroRepository } from "../../controllers/PomodoroController/getPomodoro/protocol";
import { MongoClient } from "../../database/mongo";
import { Pomodoro } from "../../models/Pomodoro";
import { OmitId } from "../../controllers/protocol";

export class MongoGetPomodoroRepository implements IGetPomodoroRepository {
  async getPomodoro(id: string): Promise<Pomodoro> {
    const pomodoro = await MongoClient.db
      .collection<OmitId<Pomodoro>>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!pomodoro) throw new Error("User not found");

    const { _id, ...rest } = pomodoro;

    return { id: _id.toHexString(), ...rest };
  }
}
