import request from "supertest";
import app from "../../../app";

it("Login: 200 on valid input", async () => {
  await global.signup();
  await request(app)
    .post("/api/auth/login")
    .send({
      email: "test@yopmail.com",
      password: "password",
    })
    .expect(200);
});

it("Login: set cookie on valid input", async () => {
  await global.signup();
  const response = await request(app).post("/api/auth/login").send({
    email: "test@yopmail.com",
    password: "password",
  });
  expect(response.get("Set-Cookie")).toBeDefined();
});

it("Login: 422 on email not exists", async () => {
  await request(app)
    .post("/api/auth/login")
    .send({
      email: "test@yopmail.com",
      password: "password",
    })
    .expect(422);
});

it("Login: 422 on invalid email", async () => {
  await request(app)
    .post("/api/auth/login")
    .send({
      email: "testyopmail.com",
      password: "password",
    })
    .expect(422);
});

it("Login: 422 on invalid password", async () => {
  await request(app)
    .post("/api/auth/login")
    .send({
      email: "test@yopmail.com",
      password: "pass",
    })
    .expect(422);
});

it("Login: 422 on empty input", async () => {
  await request(app).post("/api/auth/login").send({}).expect(422);
});
