import { User } from "../../../models/User";
import { HttpRequest, HttpResponse, ResponseBodyError } from "../../protocol";

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserController {
  handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | ResponseBodyError>>;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
