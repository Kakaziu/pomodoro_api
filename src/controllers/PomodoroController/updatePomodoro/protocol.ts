import { Pomodoro } from "../../../models/Pomodoro";

export interface UpdatePomodoroParams {
  title: string;
  timeWorking: number;
  timeShortResting: number;
  timeLongResting: number;
  totalTimePomodoro: number;
}

export interface IUpdatePomodorosRepository {
  updatePomodoro(id: string, params: UpdatePomodoroParams): Promise<Pomodoro>;
}
