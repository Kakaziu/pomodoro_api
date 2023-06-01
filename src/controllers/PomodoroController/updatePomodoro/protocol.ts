import { Pomodoro } from "../../../models/Pomodoro";

export interface UpdatePomodoroParams {
  title: string;
  timeWorking: number;
  timeShortResting: number;
  timeLongResting: number;
  totalPomodoroCompleted: number;
  totalTimePomodoro: number;
}

export interface IUpdatePomodoroRepository {
  updatePomodoro(id: string, params: UpdatePomodoroParams): Promise<Pomodoro>;
}
