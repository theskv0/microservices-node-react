import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
import validateEnv from "./validations/env.validation";
import { auth, nats, order, ticket } from "@project3/common";
import startNatsListeners from "./listeners";

dotenv.config();

validateEnv();

const start = async () => {
  console.log("==================== Order Service ====================");

  await nats.connect("nats://nats-srv:4222", { debug: false }, () => console.log("NATS connected -> order"));
  await nats.createStream(order.streamName, Object.values(order.subjects));
  await nats.addConsumer(auth.streamName, "order-service");
  await nats.addConsumer(ticket.streamName, "order-service");
  startNatsListeners();

  await mongoose
    .connect(process.env.MONGODB_CONN!)
    .then(() => {
      console.log("Connected to mongodb -> db-order");
      app.listen(process.env.PORT, async () => {
        console.log("Order service running on port " + process.env.PORT);
      });
    })
    .catch((err) => console.error(err));
};

start();
