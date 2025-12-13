import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import User from "../src/models/user.model.js";
jest.setTimeout(15000);
beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe("Admin Route", () => {
  it("should deny access for non-admin user", async () => {
    // register normal user
    await request(app).post("/api/auth/register").send({
      name: "Normal User",
      email: "user@test.com",
      password: "Password@123",
    });

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "user@test.com",
      password: "Password@123",
    });

    const res = await request(app)
      .get("/api/admin")
      .set("Authorization", `Bearer ${loginRes.body.token}`);

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("message", "Admin access only");
  });

  it("should allow access for admin user", async () => {
    // register admin properly
    await request(app).post("/api/auth/register").send({
      name: "Admin",
      email: "admin@test.com",
      password: "Password@123",
      role: "admin",
    });

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "admin@test.com",
      password: "Password@123",
    });

    const res = await request(app)
      .get("/api/admin")
      .set("Authorization", `Bearer ${loginRes.body.token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Admin access granted");
  });
});
