import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import dotenv from "dotenv";
dotenv.config();

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});


describe("Auth API", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user and return user data without password", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Rakesh",
          email: "rakesh@test.com",
          password: "Password@123",
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("user");
      expect(res.body.user).not.toHaveProperty("password");
    });
  });
});

it("should not allow registering with an existing email", async () => {
  // first registration
  await request(app).post("/api/auth/register").send({
    name: "Rakesh",
    email: "duplicate@test.com",
    password: "Password@123",
  });

  // second registration with same email
  const res = await request(app).post("/api/auth/register").send({
    name: "Another User",
    email: "duplicate@test.com",
    password: "Password@456",
  });

  expect(res.statusCode).toBe(409);
  expect(res.body).toHaveProperty("success", false);
  expect(res.body).toHaveProperty("message", "User already exists");
});

describe("POST /api/auth/login", () => {
  it("should login user with valid credentials and return token", async () => {
    // register user first
    await request(app).post("/api/auth/register").send({
      name: "Login User",
      email: "login@test.com",
      password: "Password@123",
    });

    // login
    const res = await request(app).post("/api/auth/login").send({
      email: "login@test.com",
      password: "Password@123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");

    expect(res.body.user).toHaveProperty("email", "login@test.com");
    expect(res.body.user).not.toHaveProperty("password");
  });
});

it("should fail login with incorrect password", async () => {
  // register user
  await request(app).post("/api/auth/register").send({
    name: "Wrong Pass User",
    email: "wrongpass@test.com",
    password: "Password@123",
  });

  // login with wrong password
  const res = await request(app).post("/api/auth/login").send({
    email: "wrongpass@test.com",
    password: "WrongPassword",
  });

  expect(res.statusCode).toBe(401);
  expect(res.body).toHaveProperty("success", false);
  expect(res.body).toHaveProperty("message", "Invalid credentials");
});

it("should fail login for non-existing user", async () => {
  const res = await request(app).post("/api/auth/login").send({
    email: "nouser@test.com",
    password: "Password@123",
  });

  expect(res.statusCode).toBe(401);
  expect(res.body).toHaveProperty("success", false);
  expect(res.body).toHaveProperty("message", "Invalid credentials");
});
