import { ObjectId } from "mongodb";
import { IDeletePomodoroRepository } from "../../controllers/PomodoroController/deletePomodoro/protocol";
import { OmitId } from "../../controllers/protocol";
import { MongoClient } from "../../database/mongo";
import { Pomodoro } from "../../models/Pomodoro";

export class MongoDeletePomodoroRepository
  implements IDeletePomodoroRepository
{
  async deletePomodoro(id: string): Promise<Pomodoro> {
    const pomodoro = await MongoClient.db
      .collection<OmitId<Pomodoro>>("pomodoros")
      .findOne({ _id: new ObjectId(id) });

    if (!pomodoro) throw new Error("Not found");

    const { deletedCount } = await MongoClient.db
      .collection("pomodoros")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) throw new Error("pomodoro not deleted");

    const { _id, ...rest } = pomodoro;

    return { id: _id.toHexString(), ...rest };
  }
}
