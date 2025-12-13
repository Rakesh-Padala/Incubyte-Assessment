import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import dotenv from "dotenv";

dotenv.config();

describe("Sweet API - Purchase Sweet", () => {
  let token;
  let sweetId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();

    // register admin
    await request(app).post("/api/auth/register").send({
      name: "Admin",
      email: "buyer@test.com",
      password: "password123",
      role: "admin",
    });

    // login
    const loginRes = await request(app).post("/api/auth/login").send({
      email: "buyer@test.com",
      password: "password123",
    });

    token = loginRes.body.token;

    // create sweet
    const sweetRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Rasgulla",
        category: "Indian",
        price: 10,
        quantity: 100,
      });

    expect(sweetRes.statusCode).toBe(201);
    sweetId = sweetRes.body.sweet._id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should purchase sweet when sufficient stock exists", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.sweet.quantity).toBe(95);
  });

  it("should fail when stock is insufficient", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 500 });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Insufficient stock");
  });
});
