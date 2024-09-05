import request from "supertest";
import app from "../../../app";

it("Logout: 200 on valid logout", async () => {
  const cookie = await global.signup();
  await request(app).post("/api/auth/logout").set("Cookie", cookie!).expect(200);
});

it("Logout: 401 on unauthenticated", async () => {
  await request(app).post("/api/auth/logout").expect(401);
});
