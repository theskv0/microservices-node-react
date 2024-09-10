import request from "supertest";
import app from "../../app";

it("Delete: 200 on valid input", async () => {
  const cookie = await global.signin();
  const response = await request(app)
    .post("/api/ticket")
    .set("Cookie", cookie)
    .send({
      title: "Test",
      price: 100,
    })
    .expect(201);

  await request(app)
    .delete("/api/ticket/" + response.body.ticket.id)
    .set("Cookie", cookie)
    .expect(200);
});

it("Delete: 401 on unauthenticated", async () => {
  await request(app)
    .delete("/api/ticket/" + "ticket_id")
    .send({
      title: "Test",
      price: 100,
    })
    .expect(401);
});

it("Delete: 403 access denied", async () => {
  const response = await request(app)
    .post("/api/ticket")
    .set("Cookie", await global.signin())
    .send({
      title: "Test",
      price: 100,
    })
    .expect(201);

  await request(app)
    .delete("/api/ticket/" + response.body.ticket.id)
    .set("Cookie", await global.signin())
    .expect(403);
});

it("Delete: 422 on invalid ticket_id", async () => {
  await request(app)
    .delete("/api/ticket/" + "ticket.id")
    .set("Cookie", await global.signin())
    .expect(422);
});
