import dotenv from "dotenv";
import validateEnv from "./env.validation";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { JwtUtil } from "@project3/common";
import Ticket from "../src/models/ticket.model";
import User from "../src/models/user.model";

dotenv.config({ path: ".env.test" });

validateEnv();

let mongo: any;

declare global {
  var signin: () => Promise<{ user_id: string; cookie: string[] }>;
  var createTicket: (user_id: string) => Promise<string>;
}

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db!.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  mongo.stop();
});

global.signin = async () => {
  const user_id = new mongoose.Types.ObjectId().toString();
  const user = new User({ _id: user_id, name: "Test User", email: "test@yopmail.com", password: "password" });
  await user.save();
  const token = JwtUtil.signToken({ user_id });
  const session = Buffer.from(JSON.stringify({ token })).toString("base64");
  const cookie = [`session=${session}`];
  return { cookie, user_id };
};

global.createTicket = async (user_id: string) => {
  const ticket = new Ticket({ user_id, title: "Test Ticket", price: 5.6 });
  await ticket.save();
  return ticket._id as string;
};
