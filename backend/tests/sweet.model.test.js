import mongoose from "mongoose";
import Sweet from "../src/models/sweet.model.js";
import dotenv from "dotenv";
dotenv.config();

jest.setTimeout(15000);

describe("Sweet Model", () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }
  });
  afterEach(async () => {
    await Sweet.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a sweet with valid data", async () => {
    const sweet = await Sweet.create({
      name: "Ladoo",
      category: "Indian",
      price: 10,
      quantity: 50,
    });

    expect(sweet._id).toBeDefined();
    expect(sweet.name).toBe("Ladoo");
    expect(sweet.price).toBe(10);
  });

  it("should fail if price is negative", async () => {
    await expect(
      Sweet.create({
        name: "Barfi",
        category: "Indian",
        price: -5,
        quantity: 10,
      })
    ).rejects.toThrow();
  });

  it("should fail if quantity is negative", async () => {
    await expect(
      Sweet.create({
        name: "Jalebi",
        category: "Indian",
        price: 15,
        quantity: -1,
      })
    ).rejects.toThrow();
  });

  it("should fail if name is missing", async () => {
    await expect(
      Sweet.create({
        category: "Indian",
        price: 20,
        quantity: 5,
      })
    ).rejects.toThrow();
  });
});
