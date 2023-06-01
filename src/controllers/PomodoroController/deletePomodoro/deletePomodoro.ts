import { badRequest, ok } from "../../../helpers/responseFunctions";
import { Pomodoro } from "../../../models/Pomodoro";
import { HttpRequest, HttpResponse, ResponseBodyError } from "../../protocol";
import {
  IDeletePomodoroController,
  IDeletePomodoroRepository,
} from "./protocol";

export class DeletePomodoroController implements IDeletePomodoroController {
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
