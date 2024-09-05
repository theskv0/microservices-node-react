import request from "supertest";
import app from "../../../app";

it("Get: 200 success", async () => {
  const { cookie, user_id } = await global.signin();
  const ticket_id = await global.createTicket(user_id);
  await request(app).post("/api/order").set("Cookie", cookie).send({ ticket_id }).expect(201);

  await request(app)
    .get("/api/order")
    .set("Cookie", cookie)
    .expect(200)
    .then((res) => {
      expect(res.body.records.length).toEqual(1);
      expect(res.body.total).toEqual(1);
      expect(res.body.page).toEqual(1);
      expect(res.body.limit).toEqual(10);
    });
});

it("Get: 200 pagination", async () => {
  const { cookie, user_id } = await global.signin();
  for (let i = 1; i <= 5; i++) {
    const ticket_id = await global.createTicket(user_id);
    await request(app).post("/api/order").set("Cookie", cookie).send({ ticket_id }).expect(201);
  }

  for (let i = 1; i <= 3; i++) {
    await request(app)
      .get("/api/order")
      .set("Cookie", cookie)
      .query({ page: i, limit: 2 })
      .expect(200)
      .then((res) => {
        expect(res.body.records.length).toEqual(i === 3 ? 1 : 2);
        expect(res.body.total).toEqual(5);
        expect(res.body.page).toEqual(i);
        expect(res.body.limit).toEqual(2);
      });
  }
});

it("Get: 401 unauthenticated", async () => {
  await request(app).get("/api/order").expect(401);
});

it("Get: 422 invalid input", async () => {
  const { cookie } = await global.signin();
  await request(app).get("/api/order").set("Cookie", cookie).query({ page: "test" }).expect(422);
  await request(app).get("/api/order").set("Cookie", cookie).query({ limit: "test" }).expect(422);
});
