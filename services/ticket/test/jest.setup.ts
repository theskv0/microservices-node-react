import validateEnv from "./env.validation";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { JwtUtil, nats, ticket } from "@project3/common";
import User from "../src/models/user.model";

validateEnv();

let mongo: any;

declare global {
  var signin: () => Promise<string[]>;
}

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);

  await nats.connect("nats://localhost:4222");
  await nats.createStream(ticket.streamName, Object.values(ticket.subjects));
});

beforeEach(async () => {
  const collections = await mongoose.connection.db!.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  mongo.stop();
  await nats.client.close();
});

global.signin = async () => {
  const user_id = new mongoose.Types.ObjectId().toString();
  const user = new User({ _id: user_id, name: "Test User", email: "test@yopmail.com", password: "password" });
  await user.save();
  const token = JwtUtil.signToken({ user_id });
  const session = Buffer.from(JSON.stringify({ token })).toString("base64");
  return [`session=${session}`];
};
