import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Protected Route", () => {
  it("should deny access without token", async () => {
    const res = await request(app).get("/api/protected");

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "Not authorized");
  });

  it("should allow access with valid token", async () => {
    // register user
    await request(app).post("/api/auth/register").send({
      name: "Protected User",
      email: "protected@test.com",
      password: "Password@123",
    });

    // login user
    const loginRes = await request(app).post("/api/auth/login").send({
      email: "protected@test.com",
      password: "Password@123",
    });

    const token = loginRes.body.token;

    const res = await request(app)
      .get("/api/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Access granted");
  });
});
