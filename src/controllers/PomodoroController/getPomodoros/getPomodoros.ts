import { ok, serverError } from "../../../helpers/responseFunctions";
import { Pomodoro } from "../../../models/Pomodoro";
import { HttpRequest, HttpResponse, ResponseBodyError } from "../../protocol";
import { IGetPomodorosControllers, IGetPomodorosRepository } from "./protocol";

export class GetPomodorosController implements IGetPomodorosControllers {
  constructor(
    private readonly getPomodorosRepository: IGetPomodorosRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<null>
  ): Promise<HttpResponse<Pomodoro[] | ResponseBodyError>> {
    try {
      const pomodoros = await this.getPomodorosRepository.getPomodoros();

      return ok<Pomodoro[]>(pomodoros);
    } catch (e) {
      return serverError();
    }
  }
}
