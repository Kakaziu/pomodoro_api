import { Pomodoro } from "../../../models/Pomodoro";

export interface CreatePomodoroParams {
  title: string;
  timeWorking: number;
  timeShortResting: number;
  timeLongResting: number;
  totalTimePomodoro: number;
  createBy: number;
}

export interface ICreatePomodoroRepository {
  createPomodoro(params: CreatePomodoroParams): Promise<Pomodoro>;
}
