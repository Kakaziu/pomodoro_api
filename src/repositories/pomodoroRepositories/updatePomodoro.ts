import { ObjectId } from "mongodb";
import {
  IUpdatePomodoroRepository,
  UpdatePomodoroParams,
} from "../../controllers/PomodoroController/updatePomodoro/protocol";
import { MongoClient } from "../../database/mongo";
import { Pomodoro } from "../../models/Pomodoro";
import { OmitId } from "../../controllers/protocol";

export class MongoUpdatePomodoroRepository
  implements IUpdatePomodoroRepository
{
  async updatePomodoro(
    id: string,
    params: UpdatePomodoroParams
  ): Promise<Pomodoro> {
    await MongoClient.db
      .collection("pomodoros")
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...params } });

    const user = await MongoClient.db
      .collection<OmitId<Pomodoro>>("pomodoros")
      .findOne({ _id: new ObjectId(id) });

    if (!user) throw new Error("User not update");

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
