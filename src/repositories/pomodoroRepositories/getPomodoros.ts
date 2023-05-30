import { IGetPomodorosRepository } from "../../controllers/PomodoroController/getPomodoros/protocol";
import { OmitId } from "../../controllers/protocol";
import { MongoClient } from "../../database/mongo";
import { Pomodoro } from "../../models/Pomodoro";

export class MongoGetPomodorosRepository implements IGetPomodorosRepository {
  async getPomodoros(): Promise<Pomodoro[]> {
    const users = await MongoClient.db
      .collection<OmitId<Pomodoro>>("pomodoros")
      .find({})
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
