const request = require("supertest");
const app = require("../../../src/app");
const { createUser } = require("../../../src/controllers/user.controller");

let user;

beforeAll(async () => {
  user = await createUser("test-user-2");
});

describe("Vendor", () => {
  describe("CRUD", () => {
    test("Create", async () => {
      const response = await request(app)
        .post("/vendors")
        .send({ name: "Meijer", user_id: user.id })
        .expect(200);

      expect(response.body).toStrictEqual({
        id: response.body.id,
        name: "Meijer",
        user_id: user.id,
      });
    });
    test("Read", async () => {
      const postResponse = await request(app)
        .post("/vendors")
        .send({ name: "Whole Foods", user_id: user.id })
        .expect(200);

      const postResponseId = postResponse.body.id;

      expect(postResponse.body).toStrictEqual({
        id: postResponseId,
        name: "Whole Foods",
        user_id: user.id,
      });

      const getResponse = await request(app)
        .get(`/vendors/${postResponseId}`)
        .expect(200);

      expect(getResponse.body).toStrictEqual({
        id: postResponseId,
        name: "Whole Foods",
        user_id: user.id,
      });
    });
    test("Update", async () => {
      const postResponse = await request(app)
        .post("/vendors")
        .send({ name: "Auto Zone", user_id: user.id })
        .expect(200);

      const postResponseId = postResponse.body.id;

      expect(postResponse.body).toStrictEqual({
        id: postResponseId,
        name: "Auto Zone",
        user_id: user.id,
      });

      const updateResponse = await request(app)
        .put("/vendors")
        .send({ id: postResponseId, name: "Shake Shack" });

      expect(updateResponse.body).toStrictEqual({
        id: postResponseId,
        name: "Shake Shack",
        user_id: user.id,
      });
    });
    test("Delete", async () => {
      const postResponse = await request(app)
        .post("/vendors")
        .send({ name: "Hotel Tango", user_id: user.id })
        .expect(200);
      const postResponseId = postResponse.body.id;
      expect(postResponse.body).toStrictEqual({
        id: postResponseId,
        name: "Hotel Tango",
        user_id: user.id,
      });

      const deleteResponse = await request(app)
        .delete(`/vendors/${postResponseId}`)
        .expect(200);
      expect(deleteResponse.body).toStrictEqual({
        id: postResponseId,
        name: "Hotel Tango",
        user_id: user.id,
      });
    });
  });
});
