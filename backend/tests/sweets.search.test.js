import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";

describe("Sweet API - Search Sweets", () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connection.db.dropDatabase();

    await request(app).post("/api/auth/register").send({
      name: "Admin",
      email: "searchadmin@test.com",
      password: "password123",
      role: "admin",
    });

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "searchadmin@test.com",
      password: "password123",
    });

    token = loginRes.body.token;

    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 50,
      });

    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Chocolate Bar",
        category: "Western",
        price: 25,
        quantity: 20,
      });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should search sweets by name", async () => {
    const res = await request(app)
      .get("/api/sweets/search?name=lad")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.sweets.length).toBe(1);
  });

  it("should search sweets by category", async () => {
    const res = await request(app)
      .get("/api/sweets/search?category=Western")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.sweets.length).toBe(1);
  });

  it("should search sweets by price range", async () => {
    const res = await request(app)
      .get("/api/sweets/search?minPrice=5&maxPrice=15")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.sweets.length).toBe(1);
  });
});
