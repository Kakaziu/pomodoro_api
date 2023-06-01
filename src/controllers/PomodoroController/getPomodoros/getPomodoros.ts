import { ok, serverError } from "../../../helpers/responseFunctions";
import { Pomodoro } from "../../../models/Pomodoro";
import { HttpResponse, IController, ResponseBodyError } from "../../protocol";
import { IGetPomodorosRepository } from "./protocol";

export class GetPomodorosController implements IController<any, Pomodoro[]> {
  constructor(
    private readonly getPomodorosRepository: IGetPomodorosRepository
  ) {}
  async handle(): Promise<HttpResponse<Pomodoro[] | ResponseBodyError>> {
    try {
      const pomodoros = await this.getPomodorosRepository.getPomodoros();

      return ok<Pomodoro[]>(pomodoros);
    } catch (e) {
      return serverError();
    }
  }
}
