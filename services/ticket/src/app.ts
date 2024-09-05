import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import { AuthMiddleware, ErrorMiddleware, NotFoundException } from "@project3/common";
import routes from "./routes/api";

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

app.get("/api/ticket/health", (req, res) => {
  res.json({ message: "ticket service running on port " + process.env.PORT, errors: {} });
});

app.use(AuthMiddleware);

app.use("/api/ticket", routes);

app.use("*", (req, res, next) => {
  throw new NotFoundException();
});

app.use(ErrorMiddleware);

export default app;
