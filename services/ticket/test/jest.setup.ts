import validateEnv from "./env.validation";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { JwtUtil } from "@project3/common";

validateEnv();

let mongo: any;

declare global {
  var signin: () => string[];
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

global.signin = () => {
  const payload = { user_id: new mongoose.Types.ObjectId().toString() };
  const token = JwtUtil.signToken(payload);
  const session = Buffer.from(JSON.stringify({ token })).toString("base64");
  return [`session=${session}`];
};
