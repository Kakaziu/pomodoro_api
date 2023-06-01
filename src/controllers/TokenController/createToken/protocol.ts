import { User } from "../../../models/User";

export interface CreateTokenResponse {
  user: User;
  token: string;
}

export interface CreateTokenParams {
  email: string;
  password: string;
}
