import "reflect-metadata";
import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "../src/config/env";
import userRouter from "./routes/user.routes"
import authRouter from "./routes/auth.routes";
import * as dotenv from "dotenv";
import { AppDataSource } from "./database/db";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Bookie!");
});

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log(`Database connected`);
    app.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch(error) {
    
  console.error("Error during Data Source initialization:", error);
  }
}

startServer()