import { Pomodoro } from "../../../models/Pomodoro";

export interface IGetPomodorosRepository {
  getPomodoros(): Promise<Pomodoro[]>;
}
