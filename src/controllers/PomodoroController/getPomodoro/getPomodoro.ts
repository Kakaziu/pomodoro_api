import {
  badRequest,
  ok,
  serverError,
} from "../../../helpers/responseFunctions";
import { Pomodoro } from "../../../models/Pomodoro";
import { MongoGetPomodoroRepository } from "../../../repositories/pomodoroRepositories/getPomodoro";
import {
  HttpRequest,
  HttpResponse,
  IController,
  ResponseBodyError,
} from "../../protocol";

export class GetPomodoroController implements IController<any, Pomodoro> {
  constructor(
    private readonly getPomodoroRepository: MongoGetPomodoroRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Pomodoro | ResponseBodyError>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) return badRequest("Missing Id");

      const pomodoro = await this.getPomodoroRepository.getPomodoro(id);

      return ok<Pomodoro>(pomodoro);
    } catch (e) {
      console.log(e);
      return serverError();
    }
  }
}
