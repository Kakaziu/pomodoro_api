import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url =
      process.env.MONGO_URL || "mongodb+srv://cluster0.z3gf8.mongodb.net";
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;

    const client = new Mongo(url, { auth: { username, password } });
    const db = client.db("pomodoro-db");

    this.client = client;
    this.db = db;
  },
};
