import request from "supertest";
import app from "../../../src/app";

it("Find: 200 success", async () => {
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
    .get("/api/ticket/" + response.body.ticket.id)
    .set("Cookie", cookie)
    .expect(200)
    .then((res) => {
      expect(res.body.ticket.title).toEqual("Test");
    });
});

it("Find: 401 unauthenticated", async () => {
  await request(app).get("/api/ticket").expect(401);
});

it("Find: 422 unable to find", async () => {
  await request(app)
    .get("/api/ticket/" + "ticket.id")
    .set("Cookie", await global.signin())
    .expect(422);
});
