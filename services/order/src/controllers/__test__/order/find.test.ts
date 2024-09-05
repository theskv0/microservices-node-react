import request from "supertest";
import app from "../../../app";

it("Find: 200 success", async () => {
  const { cookie, user_id } = await global.signin();
  const ticket_id = await global.createTicket(user_id);
  const response = await request(app).post("/api/order").set("Cookie", cookie).send({ ticket_id }).expect(201);

  await request(app)
    .get("/api/order/" + response.body.order.id)
    .set("Cookie", cookie)
    .expect(200)
    .then((res) => {
      expect(res.body.order.id).toEqual(response.body.order.id);
    });
});

it("Find: 401 unauthenticated", async () => {
  await request(app).get("/api/order").expect(401);
});

it("Find: 422 unable to find", async () => {
  await request(app)
    .get("/api/order/" + "order.id")
    .set("Cookie", (await global.signin()).cookie)
    .expect(422);
});
