import mongoose from "mongoose";
import app from "./app";
import validateEnv from "./validators/env.validation";
import { auth, nats } from "@project3/common";

validateEnv();

const start = async () => {
  console.log("==================== Auth Service ====================");
  await nats.connect("nats://nats-srv:4222", { debug: false }, () => console.log("NATS connected -> auth"));
  await nats.createStream(auth.streamName, Object.values(auth.subjects));
  await mongoose
    .connect(process.env.MONGODB_CONN!)
    .then(() => {
      console.log("Connected to mongodb -> db-auth");
      app.listen(process.env.PORT, async () => {
        console.log("Auth service running on port " + process.env.PORT);
      });
    })
    .catch((err) => console.error(err));
};

start();
