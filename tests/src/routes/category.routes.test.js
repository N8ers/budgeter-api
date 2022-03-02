const request = require("supertest");
const app = require("../../../src/app");
const { createUser } = require("../../../src/controllers/user.controller");

let user;

beforeAll(async () => {
  user = await createUser("test-user-1");
});

describe("Category", () => {
  describe("CRUD", () => {
    test("Create", async () => {
      const response = await request(app)
        .post("/categories")
        .send({ name: "groceries", user_id: user.id })
        .expect(200);

      expect(response.body).toStrictEqual({
        id: response.body.id,
        name: "groceries",
        user_id: user.id,
      });
    });

    test("Read", async () => {
      const postResponse = await request(app)
        .post("/categories")
        .send({ name: "entertainment", user_id: user.id })
        .expect(200);

      const postResponseId = postResponse.body.id;

      expect(postResponse.body).toStrictEqual({
        id: postResponseId,
        name: "entertainment",
        user_id: user.id,
      });

      const getResponse = await request(app)
        .get(`/categories/${postResponseId}`)
        .expect(200);

      expect(getResponse.body).toStrictEqual({
        id: postResponseId,
        name: "entertainment",
        user_id: user.id,
      });
    });
    test("Update", async () => {
      const postResponse = await request(app)
        .post("/categories")
        .send({ name: "education", user_id: user.id })
        .expect(200);

      const postResponseId = postResponse.body.id;

      expect(postResponse.body).toStrictEqual({
        id: postResponseId,
        name: "education",
        user_id: user.id,
      });

      const updateResponse = await request(app)
        .put("/categories")
        .send({ id: postResponseId, name: "car maintance" });

      expect(updateResponse.body).toStrictEqual({
        id: postResponseId,
        name: "car maintance",
        user_id: user.id,
      });
    });
    test("Delete", async () => {
      const postResponse = await request(app)
        .post("/categories")
        .send({ name: "beverages", user_id: user.id })
        .expect(200);
      const postResponseId = postResponse.body.id;
      expect(postResponse.body).toStrictEqual({
        id: postResponseId,
        name: "beverages",
        user_id: user.id,
      });

      const deleteResponse = await request(app)
        .delete(`/categories/${postResponseId}`)
        .expect(200);
      expect(deleteResponse.body).toStrictEqual({
        id: postResponseId,
        name: "beverages",
        user_id: user.id,
      });
    });
  });
});
