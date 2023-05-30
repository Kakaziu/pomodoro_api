import { User } from "../../../models/User";
import { HttpRequest, HttpResponse, ResponseBodyError } from "../../protocol";

export interface CreateTokenResponse {
  user: User;
  token: string;
}

export interface CreateTokenParams {
  email: string;
  password: string;
}

export interface ICreateTokenController {
  handle(
    httpRequest: HttpRequest<CreateTokenParams>
  ): Promise<HttpResponse<CreateTokenResponse | ResponseBodyError>>;
}
