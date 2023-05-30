import { User } from "../../../models/User";

export interface IGetUserRepository {
  getUserBy(params: string): Promise<User>;
}
