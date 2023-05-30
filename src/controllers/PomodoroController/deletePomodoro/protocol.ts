import { Pomodoro } from "../../../models/Pomodoro";

export interface IDeletePomodoroRepository {
  deletePomodoro(id: string): Promise<Pomodoro>;
}
