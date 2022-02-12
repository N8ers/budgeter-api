const request = require("supertest");
const app = require("../../../src/app");

describe("User", () => {
  describe("CRUD", () => {
    test("Create", async () => {
      const response = await request(app)
        .post("/users")
        .send({ name: "Tsuki" })
        .expect(200);

      expect(response.body).toStrictEqual({
        id: response.body.id,
        name: "Tsuki",
      });
    });

    test("Read", async () => {
      const postResponse = await request(app)
        .post("/users")
        .send({ name: "Tsuki the cat" })
        .expect(200);

      expect(postResponse.body).toStrictEqual({
        id: postResponse.body.id,
        name: "Tsuki the cat",
      });

      const getResponse = await request(app).get(
        `/users/${postResponse.body.id}`
      );

      expect(getResponse.body).toStrictEqual({
        id: getResponse.body.id,
        name: "Tsuki the cat",
      });
    });

    test("Update", async () => {
      const postResponse = await request(app)
        .post("/users")
        .send({ name: "Tsuki the cat" })
        .expect(200);

      expect(postResponse.body).toStrictEqual({
        id: postResponse.body.id,
        name: "Tsuki the cat",
      });

      const putResponse = await request(app)
        .put("/users")
        .send({ id: postResponse.body.id, name: "Tsuki the baby cat" })
        .expect(200);

      expect(putResponse.body).toStrictEqual({
        id: postResponse.body.id,
        name: "Tsuki the baby cat",
      });
    });

    test("Delete", async () => {
      const postResponse = await request(app)
        .post("/users")
        .send({ name: "Tsuki the cat" })
        .expect(200);
      const postResponseId = postResponse.body.id;
      expect(postResponse.body).toStrictEqual({
        id: postResponseId,
        name: "Tsuki the cat",
      });

      const deleteResponse = await request(app).delete(
        `/users/${postResponseId}`
      );
      expect(deleteResponse.body).toStrictEqual(postResponse.body.id);

      const getResponse = await request(app).get(`/users/${postResponseId}`);
      expect(getResponse.body).toStrictEqual({});
    });
  });
});
