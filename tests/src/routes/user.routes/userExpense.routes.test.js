const request = require("supertest");
const app = require("../../../../src/app");

///////////////////////////////////////////////////
// We need to build CRUD ops on all other routes //
// before this one can be effectively tested     //
///////////////////////////////////////////////////

describe("/:userId/expenses route", () => {
  let exampleUsers = [];
  let exampleVendors = [];
  let exampleCategories = [];
  let exampleExpenses = [];

  beforeAll(async () => {
    // Create users
    const exampleUser1 = await request(app)
      .post("/users")
      .send({ name: "Tsuki the cat" })
      .expect(200);
    const exampleUser2 = await request(app)
      .post("/users")
      .send({ name: "Goon" })
      .expect(200);
    exampleUsers.push(exampleUser1, exampleUser2);

    const exampleVendor1 = await request(app)
      .post("/users")
      .send({ name: "Tsuki the cat" })
      .expect(200);
    const exampleVendor2 = await request(app)
      .post("/users")
      .send({ name: "Tsuki the cat" })
      .expect(200);
  });

  describe("Filtering", () => {
    test("Filtering startDate-endDate", async () => {});
    test("Filtering categoryId", async () => {});
    test("Filtering categoryId", async () => {});
  });
  describe("Sorting", () => {
    test("Sorting by field ___ in default order (ASC)", async () => {});
    test("Sorting by field ___ in DESC order", async () => {});
  });
  describe("Pagination", () => {
    test("Limit default works", async () => {});
    test("Offset default works", async () => {});
    test("Limit and Offset work togeather", async () => {});
  });
});
