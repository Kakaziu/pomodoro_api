import {
  badRequest,
  ok,
  serverError,
} from "../../../helpers/responseFunctions";
import { Pomodoro } from "../../../models/Pomodoro";
import { MongoUpdatePomodoroRepository } from "../../../repositories/pomodoroRepositories/updatePomodoro";
import {
  HttpRequest,
  HttpResponse,
  IController,
  ResponseBodyError,
} from "../../protocol";
import { UpdatePomodoroParams } from "./protocol";

export class UpdatePomodoroController
  implements IController<UpdatePomodoroParams, Pomodoro>
{
  constructor(
    private readonly updatePomodoroRepository: MongoUpdatePomodoroRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<UpdatePomodoroParams>
  ): Promise<HttpResponse<Pomodoro | ResponseBodyError>> {
    try {
      const body = httpRequest?.body;
      const id = httpRequest?.params?.id;

      if (!body) return badRequest("Missing body");
      if (!id) return badRequest("Missing Id");

      const pomodoro = await this.updatePomodoroRepository.updatePomodoro(
        id,
        body
      );

      return ok<Pomodoro>(pomodoro);
    } catch (e) {
      return serverError();
    }
  }
}
