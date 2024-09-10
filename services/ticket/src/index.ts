import mongoose from "mongoose";
import app from "./app";
import validateEnv from "./validations/env.validation";
import { auth, nats, ticket } from "@project3/common";
import startNatsListeners from "./listeners";

validateEnv();

const start = async () => {
  console.log("==================== Ticket Service ====================");

  await nats.connect("nats://nats-srv:4222", { debug: false }, () => {
    console.log("NATS connected -> ticket");
    nats.client.closed().then(() => console.log("NATS closed -> ticket"));
  });
  await nats.addConsumer(auth.streamName, "ticket-service");
  await nats.createStream(ticket.streamName, Object.values(ticket.subjects));
  startNatsListeners();

  await mongoose
    .connect(process.env.MONGODB_CONN!)
    .then(() => {
      console.log("Connected to mongodb -> db-ticket");
      app.listen(process.env.PORT, async () => {
        console.log("Ticket service running on port " + process.env.PORT);
      });
    })
    .catch((err) => console.error(err));
};

start();
