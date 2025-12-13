import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import dotenv from "dotenv";
dotenv.config();
jest.setTimeout(15000);
describe("Sweet API - List Sweets", () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // create user
    await request(app).post("/api/auth/register").send({
      name: "User",
      email: "list@test.com",
      password: "password123",
    });

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "list@test.com",
      password: "password123",
    });

    token = loginRes.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it("should return list of sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.sweets)).toBe(true);
  });
});
