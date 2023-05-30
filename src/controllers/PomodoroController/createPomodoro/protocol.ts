import { Pomodoro } from "../../../models/Pomodoro";
import { HttpRequest, HttpResponse, ResponseBodyError } from "../../protocol";

export interface CreatePomodoroParams {
  title: string;
  timeWorking: number;
  timeShortResting: number;
  timeLongResting: number;
  totalTimePomodoro: number;
  createBy: number;
}

export interface ICreatePomodoroController {
  handle(
    httpRequest: HttpRequest<CreatePomodoroParams>
  ): Promise<HttpResponse<Pomodoro | ResponseBodyError>>;
}

export interface ICreatePomodoroRepository {
  createPomodoro(params: CreatePomodoroParams): Promise<Pomodoro>;
}
