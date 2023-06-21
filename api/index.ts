import express from "express";
import { config } from "dotenv";
import cors from "cors";
import userRoutes from "../src/routes/user";
import tokenRoutes from "../src/routes/token";
import pomodoroRoutes from "../src/routes/pomodoro";
import { MongoClient } from "../src/database/mongo";

config();

const app = express();

app.use(express.json());
app.use(cors());
MongoClient.connect()
  .then(() => {
    console.log("Database ready");
    app.emit("Database Ready");
  })
  .catch((e) => console.log(e));

app.use("/users", userRoutes);
app.use("/tokens", tokenRoutes);
app.use("/pomodoros", pomodoroRoutes);

app.on("Database Ready", () => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running...");
  });
});
