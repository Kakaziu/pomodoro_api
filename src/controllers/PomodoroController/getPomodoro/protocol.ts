import { Pomodoro } from "../../../models/Pomodoro";
import { HttpRequest, HttpResponse, ResponseBodyError } from "../../protocol";

export interface IGetPomodoroController {
  handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Pomodoro | ResponseBodyError>>;
}

export interface IGetPomodoroRepository {
  getPomodoro(id: string): Promise<Pomodoro>;
}
