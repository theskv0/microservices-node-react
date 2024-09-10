import request from "supertest";
import app from "../../app";

it("Get: 200 success", async () => {
  const cookie = await global.signin();
  await request(app)
    .post("/api/ticket")
    .set("Cookie", cookie)
    .send({
      title: "Test",
      price: 100,
    })
    .expect(201);

  await request(app)
    .get("/api/ticket")
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
  const cookie = await global.signin();
  for (let i = 1; i <= 5; i++) {
    await request(app)
      .post("/api/ticket")
      .set("Cookie", cookie)
      .send({
        title: "Test " + i,
        price: 100,
      })
      .expect(201);
  }

  for (let i = 1; i <= 3; i++) {
    await request(app)
      .get("/api/ticket")
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

it("Get: 200 search", async () => {
  const cookie = await global.signin();
  const arr = [
    { title: "Test", price: 100 },
    { title: "Hello world", price: 50 },
  ];
  for (let item of arr) {
    await request(app)
      .post("/api/ticket")
      .set("Cookie", cookie)
      .send({
        title: item.title,
        price: item.price,
      })
      .expect(201);
  }

  await request(app)
    .get("/api/ticket")
    .query({ search: "world" })
    .set("Cookie", cookie)
    .expect(200)
    .expect((res) => {
      if (!res.body.records[0].title.includes("world")) throw new Error("title doesn't contain the expected string");
    });
});

it("Get: 200 own", async () => {
  await request(app)
    .post("/api/ticket")
    .set("Cookie", await global.signin())
    .send({ title: "Test", price: 100 })
    .expect(201);
  const cookie = await global.signin();
  await request(app).post("/api/ticket").set("Cookie", cookie).send({ title: "Hello world", price: 50 }).expect(201);

  await request(app)
    .get("/api/ticket")
    .query({ own: 1 })
    .set("Cookie", cookie)
    .expect(200)
    .then((res) => {
      expect(res.body.records.length).toEqual(1);
    });

  await request(app)
    .get("/api/ticket")
    .query({ own: 0 })
    .set("Cookie", cookie)
    .expect(200)
    .then((res) => {
      expect(res.body.records.length).toEqual(2);
    });
});

it("Get: 401 unauthenticated", async () => {
  await request(app).get("/api/ticket").expect(401);
});

it("Get: 422 invalid input", async () => {
  const cookie = await global.signin();
  await request(app).get("/api/ticket").set("Cookie", cookie).query({ page: "test" }).expect(422);
  await request(app).get("/api/ticket").set("Cookie", cookie).query({ limit: "test" }).expect(422);
  await request(app).get("/api/ticket").set("Cookie", cookie).query({ own: "test" }).expect(422);
});
