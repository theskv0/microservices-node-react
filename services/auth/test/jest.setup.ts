import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import validateEnv from "./env.validation";
import request from "supertest";
import app from "../src/app";
import { auth, nats } from "@project3/common";

validateEnv();

let mongo: any;

declare global {
  var signup: () => Promise<string[]>;
}

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);

  await nats.connect("nats://localhost:4222");
  await nats.createStream(auth.streamName, Object.values(auth.subjects));
});

beforeEach(async () => {
  const collections = await mongoose.connection.db!.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) await mongo.stop();
});

global.signup = async () => {
  const response = await request(app)
    .post("/api/auth/signup")
    .send({
      name: "Test",
      email: "test@yopmail.com",
      password: "password",
    })
    .expect(201);
  const cookie = response.get("Set-Cookie");
  return cookie!;
};
