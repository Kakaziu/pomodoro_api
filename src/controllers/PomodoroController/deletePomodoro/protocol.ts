import { Pomodoro } from "../../../models/Pomodoro";
import { HttpRequest, HttpResponse, ResponseBodyError } from "../../protocol";

export interface IDeletePomodoroController {
  handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Pomodoro | ResponseBodyError>>;
}

export interface IDeletePomodoroRepository {
  deletePomodoro(id: string): Promise<Pomodoro>;
}
