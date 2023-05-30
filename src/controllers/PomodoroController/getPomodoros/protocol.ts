import { Pomodoro } from "../../../models/Pomodoro";
import { HttpRequest, HttpResponse, ResponseBodyError } from "../../protocol";

export interface IGetPomodorosControllers {
  handle(
    httpRequest: HttpRequest<null>
  ): Promise<HttpResponse<Pomodoro[] | ResponseBodyError>>;
}

export interface IGetPomodorosRepository {
  getPomodoros(): Promise<Pomodoro[]>;
}
