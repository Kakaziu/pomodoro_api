import { badRequest, ok } from "../../../helpers/responseFunctions";
import { Pomodoro } from "../../../models/Pomodoro";
import {
  HttpRequest,
  HttpResponse,
  IController,
  ResponseBodyError,
} from "../../protocol";
import { IDeletePomodoroRepository } from "./protocol";

export class DeletePomodoroController implements IController<any, Pomodoro> {
  constructor(
    private readonly deletePomodoroRepository: IDeletePomodoroRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Pomodoro | ResponseBodyError>> {
    const id = httpRequest?.params?.id;

    if (!id) return badRequest("Missing Id");

    const pomodoroDeleted = await this.deletePomodoroRepository.deletePomodoro(
      id
    );

    return ok<Pomodoro>(pomodoroDeleted);
  }
}
