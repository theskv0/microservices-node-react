import request from "supertest";
import app from "../../../app";
import { OrderStatus } from "@project3/common";

it("Cancel: 200 success", async () => {
  const { cookie, user_id } = await global.signin();
  const ticket_id = await global.createTicket(user_id);
  const response = await request(app).post("/api/order").set("Cookie", cookie).send({ ticket_id }).expect(201);

  await request(app)
    .delete("/api/order/" + response.body.order.id)
    .set("Cookie", cookie)
    .expect(200)
    .then((res) => {
      expect(res.body.order.status).toEqual(OrderStatus.Cancelled);
    });
});

it("Cancel: 401 unauthenticated", async () => {
  await request(app)
    .delete("/api/order/" + "order_id")
    .expect(401);
});

it("Cancel: 422 unable to find", async () => {
  await request(app)
    .get("/api/order/" + "order.id")
    .set("Cookie", (await global.signin()).cookie)
    .expect(422);
});

it("Cancel: 403 access denied", async () => {
  const { cookie, user_id } = await global.signin();
  const ticket_id = await global.createTicket(user_id);
  const response = await request(app).post("/api/order").set("Cookie", cookie).send({ ticket_id }).expect(201);

  await request(app)
    .delete("/api/order/" + response.body.order.id)
    .set("Cookie", (await global.signin()).cookie)
    .expect(403);
});

it("Cancel: 422 already cancelled", async () => {
  const { cookie, user_id } = await global.signin();
  const ticket_id = await global.createTicket(user_id);
  const response = await request(app).post("/api/order").set("Cookie", cookie).send({ ticket_id }).expect(201);

  await request(app)
    .delete("/api/order/" + response.body.order.id)
    .set("Cookie", cookie)
    .expect(200);

  await request(app)
    .delete("/api/order/" + response.body.order.id)
    .set("Cookie", cookie)
    .expect(422);
});
