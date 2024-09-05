import request from "supertest";
import app from "../../../app";

it("Create: 201 on valid input", async () => {
  const { cookie, user_id } = await global.signin();
  const ticket_id = await global.createTicket(user_id);
  await request(app).post("/api/order").set("Cookie", cookie).send({ ticket_id }).expect(201);
});

it("Create: 401 on unauthenticated", async () => {
  await request(app).post("/api/order").send({}).expect(401);
});

it("Create: 422 on invalid title_id", async () => {
  await request(app)
    .post("/api/order")
    .set("Cookie", (await global.signin()).cookie)
    .send({ title_id: 5 })
    .expect(422);
});
