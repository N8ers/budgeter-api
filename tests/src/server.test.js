const request = require("supertest");
const app = require("../../src/app");

describe("Test connection", () => {
  test("Get '/' should respond with message", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("new setup works");
  });

  test("Non matching route returns appropriate message", async () => {
    const response = await request(app).get("/aRouteThatDoesNotExist");
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe("no such route exists");
  });
});
