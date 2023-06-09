import { Pomodoro } from "../../../models/Pomodoro";

export interface CreatePomodoroParams {
  title: string;
  timeWorking: number;
  timeShortResting: number;
  timeLongResting: number;
  totalPomodoroCompleted: number;
  totalTimePomodoro: number;
  createBy: string;
  createdAt: number;
}

export interface ICreatePomodoroRepository {
  createPomodoro(params: CreatePomodoroParams): Promise<Pomodoro>;
}
