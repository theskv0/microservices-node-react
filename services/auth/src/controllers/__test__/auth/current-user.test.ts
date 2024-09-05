import request from "supertest";
import app from "../../../app";

it("CurrentUser: 200 on valid input", async () => {
  const cookie = await global.signup();
  const currentUserRes = await request(app).get("/api/auth/current-user").set("Cookie", cookie!).expect(200);
  expect(currentUserRes.body.user.email).toStrictEqual("test@yopmail.com");
});

it("CurrentUser: 401 on unauthenticated", async () => {
  await request(app).get("/api/auth/current-user").expect(401);
});
