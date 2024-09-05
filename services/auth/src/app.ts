import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { json } from "body-parser";
import routes from "./routes/api";
import cookieSession from "cookie-session";
import { ErrorMiddleware, NotFoundException } from "@project3/common";

const app = express();

app.set("trust proxy", true);

app.use(cors());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(json());

app.get("/api/auth/health", (req, res) => {
  res.json({ message: "auth service running on port " + process.env.PORT, errors: {} });
});

app.use("/api/auth", routes);

app.use("*", () => {
  throw new NotFoundException();
});

app.use(ErrorMiddleware);

export default app;
