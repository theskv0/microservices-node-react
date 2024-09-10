import request from "supertest";
import app from "../../app";

it("Create: 201 on valid input", async () => {
  await request(app)
    .post("/api/ticket")
    .set("Cookie", await global.signin())
    .send({
      title: "Test",
      price: 100,
    })
    .expect(201);
});

it("Create: 401 on unauthenticated", async () => {
  await request(app)
    .post("/api/ticket")
    .send({
      title: "Test",
      price: 100,
    })
    .expect(401);
});

it("Create: 422 on invalid title", async () => {
  await request(app)
    .post("/api/ticket")
    .set("Cookie", await global.signin())
    .send({
      title: 5,
      price: 100,
    })
    .expect(422);
});

it("Create: 422 on invalid price", async () => {
  await request(app)
    .post("/api/ticket")
    .set("Cookie", await global.signin())
    .send({
      title: "Test",
      price: "price",
    })
    .expect(422);
});
