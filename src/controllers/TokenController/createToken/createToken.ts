import validator from "validator";
import jwt from "jsonwebtoken";
import {
  HttpRequest,
  HttpResponse,
  IController,
  ResponseBodyError,
} from "../../protocol";
import { CreateTokenParams, CreateTokenResponse } from "./protocol";
import { MongoGetUserByEmailRepository } from "../../../repositories/userRepositories/getUser";
import {
  badRequest,
  ok,
  serverError,
} from "../../../helpers/responseFunctions";
import { validEmptyCamps } from "../../../helpers/validEmptyCamps";

export class CreateTokenController
  implements IController<CreateTokenParams, CreateTokenResponse>
{
  constructor(
    private readonly getUserRepository: MongoGetUserByEmailRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<CreateTokenParams>
  ): Promise<HttpResponse<CreateTokenResponse | ResponseBodyError>> {
    try {
      const body = httpRequest?.body;

      if (!body) return badRequest("Missing body");

      const haveEmptyCamps = validEmptyCamps(body, "email", "password");

      if (haveEmptyCamps) return badRequest(haveEmptyCamps);

      const emailIsValid = validator.isEmail(body.email);

      if (!emailIsValid) return badRequest("E-mail is invalid");

      const user = await this.getUserRepository.getUserBy(body.email);

      if (!user) return badRequest("User not exist");

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET ?? ""
      );

      return ok<CreateTokenResponse>({ user, token });
    } catch (e) {
      return serverError();
    }
  }
}
