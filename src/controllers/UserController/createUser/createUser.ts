import validator from "validator";
import { User } from "../../../models/User";
import { HttpRequest, HttpResponse, ResponseBodyError } from "../../protocol";
import { ICreateUserController, CreateUserParams } from "./protocol";
import { MongoCreateUserRepository } from "../../../repositories/userRepositories/createUser";
import {
  badRequest,
  created,
  serverError,
} from "../../../helpers/responseFunctions";
import { validEmptyCamps } from "../../../helpers/validEmptyCamps";

export class CreateUserController implements ICreateUserController {
  constructor(
    private readonly createUserRepository: MongoCreateUserRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | ResponseBodyError>> {
    try {
      const body = httpRequest?.body;

      if (!body) return badRequest("Missing body");

      const haveEmptyCamps = validEmptyCamps(
        body,
        "firstName",
        "lastName",
        "email",
        "password"
      );

      if (haveEmptyCamps) return badRequest(haveEmptyCamps);

      const emailIsValid = validator.isEmail(body.email);

      if (!emailIsValid) return badRequest("E-mail is invalid");

      const isRepeat = await this.createUserRepository.isRepeatedUser(
        body.email
      );

      if (isRepeat) return badRequest("This e-mail already exists");

      const user = await this.createUserRepository.createUser(body);

      return created<User>(user);
    } catch (e) {
      console.log(e);
      return serverError();
    }
  }
}
