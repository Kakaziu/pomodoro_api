import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { MongoClient } from "./database/mongo";
import pomodoroRoutes from "./routes/pomodoro";
import tokenRoutes from "./routes/token";
import userRoutes from "./routes/user";

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

app.use(cors());

app.on("Database Ready", () => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running...");
  });
});
