import { Pomodoro } from "../../../models/Pomodoro";
import { HttpRequest, HttpResponse, ResponseBodyError } from "../../protocol";

export interface UpdatePomodoroParams {
  title: string;
  timeWorking: number;
  timeShortResting: number;
  timeLongResting: number;
  totalPomodoroCompleted: number;
  totalTimePomodoro: number;
}

export interface IUpdatePomodoroController {
  handle(
    httpRequest: HttpRequest<UpdatePomodoroParams>
  ): Promise<HttpResponse<Pomodoro | ResponseBodyError>>;
}

export interface IUpdatePomodoroRepository {
  updatePomodoro(id: string, params: UpdatePomodoroParams): Promise<Pomodoro>;
}
