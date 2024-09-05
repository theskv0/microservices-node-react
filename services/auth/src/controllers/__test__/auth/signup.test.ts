import request from "supertest";
import app from "../../../app";

it("Signup: 201 on valid input", async () => {
  await global.signup();
});

it("Signup: set cookie on valid signup", async () => {
  const cookie = await global.signup();
  expect(cookie).toBeDefined();
});

it("Signup: 422 on email already taken", async () => {
  await global.signup();
  await request(app)
    .post("/api/auth/signup")
    .send({
      name: "Test",
      email: "test@yopmail.com",
      password: "password",
    })
    .expect(422);
});

it("Signup: 422 on invalid email", async () => {
  await request(app)
    .post("/api/auth/signup")
    .send({
      name: "Test",
      email: "testyopmail.com",
      password: "password",
    })
    .expect(422);
});

it("Signup: 422 on invalid password", async () => {
  await request(app)
    .post("/api/auth/signup")
    .send({
      name: "Test",
      email: "test@yopmail.com",
      password: "pass",
    })
    .expect(422);
});

it("Signup: 422 on empty input", async () => {
  await request(app).post("/api/auth/signup").send({}).expect(422);
});
