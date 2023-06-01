import { Pomodoro } from "../../../models/Pomodoro";

export interface IGetPomodoroRepository {
  getPomodoro(id: string): Promise<Pomodoro>;
}
