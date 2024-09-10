import request from "supertest";
import app from "../../app";

it("Update: 200 on valid input", async () => {
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
    .put("/api/ticket/" + response.body.ticket.id)
    .set("Cookie", cookie)
    .send({
      title: "Test",
      price: 100,
    })
    .expect(200);
});

it("Update: 401 on unauthenticated", async () => {
  await request(app)
    .put("/api/ticket/" + "ticket_id")
    .send({
      title: "Test",
      price: 100,
    })
    .expect(401);
});

it("Update: 403 access denied", async () => {
  const response = await request(app)
    .post("/api/ticket")
    .set("Cookie", await global.signin())
    .send({
      title: "Test",
      price: 100,
    })
    .expect(201);

  await request(app)
    .put("/api/ticket/" + response.body.ticket.id)
    .set("Cookie", await global.signin())
    .send({
      title: "Test",
      price: 100,
    })
    .expect(403);
});

it("Update: 422 on invalid ticket_id", async () => {
  await request(app)
    .put("/api/ticket/" + "ticket.id")
    .set("Cookie", await global.signin())
    .send({
      title: "Test",
      price: 100,
    })
    .expect(422);
});

it("Update: 422 on invalid title", async () => {
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
    .put("/api/ticket/" + response.body.ticket.id)
    .set("Cookie", cookie)
    .send({
      title: 100,
      price: 100,
    })
    .expect(422);
});

it("Update: 422 on invalid price", async () => {
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
    .put("/api/ticket/" + response.body.ticket.id)
    .set("Cookie", cookie)
    .send({
      title: "Test",
      price: "test",
    })
    .expect(422);
});
