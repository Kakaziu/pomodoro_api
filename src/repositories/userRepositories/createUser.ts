import bcryptjs from "bcryptjs";
import {
  CreateUserParams,
  ICreateUserRepository,
} from "../../controllers/UserController/createUser/protocol";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/User";
import { OmitId } from "../../controllers/protocol";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { password, ...rest } = params;
    const paramsWithEncryptedPaassword = {
      ...rest,
      password: bcryptjs.hashSync(password),
    };

    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(paramsWithEncryptedPaassword);

    const user = await MongoClient.db
      .collection<OmitId<User>>("users")
      .findOne({ _id: insertedId });

    if (!user) throw new Error("User not created");

    const { _id, ...restUser } = user;

    return { id: _id.toHexString(), ...restUser };
  }

  async isRepeatedUser(email: string): Promise<boolean> {
    let repeatedControl = false;
    const user = await MongoClient.db
      .collection("users")
      .findOne({ email: email });

    if (user) repeatedControl = true;

    return repeatedControl;
  }
}
