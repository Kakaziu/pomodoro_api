import { IGetUserRepository } from "../../controllers/UserController/getUser/protocol";
import { OmitId } from "../../controllers/protocol";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/User";

export class MongoGetUserByEmailRepository implements IGetUserRepository {
  async getUserBy(params: string): Promise<User> {
    const user = await MongoClient.db
      .collection<OmitId<User>>("users")
      .findOne({ email: params });

    if (!user) throw new Error("User not found");

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
