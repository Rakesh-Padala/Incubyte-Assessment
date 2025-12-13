import request from "supertest";
import app from "../src/app.js";

describe("Health Check API", () => {
  it("should return server health status", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      status: "OK",
    });
  });
});
