import {
  badRequest,
  created,
  serverError,
} from "../../../helpers/responseFunctions";
import { validEmptyCamps } from "../../../helpers/validEmptyCamps";
import { Pomodoro } from "../../../models/Pomodoro";
import { MongoCreatePomodoroRepository } from "../../../repositories/pomodoroRepositories/createPomodoro";
import {
  HttpRequest,
  HttpResponse,
  IController,
  ResponseBodyError,
} from "../../protocol";
import { CreatePomodoroParams } from "./protocol";

export class CreatePomodoroController
  implements IController<CreatePomodoroParams, Pomodoro>
{
  constructor(
    private readonly createPomodoroRepository: MongoCreatePomodoroRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<CreatePomodoroParams>
  ): Promise<HttpResponse<Pomodoro | ResponseBodyError>> {
    try {
      const body = httpRequest?.body;

      if (!body) return badRequest("Missing body");

      const haveEmptyCamps = validEmptyCamps(
        body,
        "title",
        "timeWorking",
        "timeShortResting",
        "timeLongResting"
      );

      if (haveEmptyCamps) return badRequest(haveEmptyCamps);

      const pomodoro = await this.createPomodoroRepository.createPomodoro({
        title: body.title,
        timeWorking: body.timeWorking,
        timeShortResting: body.timeShortResting,
        timeLongResting: body.timeLongResting,
        totalPomodoroCompleted: 0,
        totalTimePomodoro: 0,
        createBy: body.createBy,
        createdAt: Date.now(),
      });

      return created<Pomodoro>(pomodoro);
    } catch (e) {
      return serverError();
    }
  }
}
