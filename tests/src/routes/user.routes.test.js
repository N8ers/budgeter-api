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

      const getResponse = await request(app)
        .get(`/users/${postResponse.body.id}`)
        .expect(200);

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

      const deleteResponse = await request(app)
        .delete(`/users/${postResponseId}`)
        .expect(200);
      expect(deleteResponse.body).toStrictEqual(postResponse.body.id);

      const getResponse = await request(app)
        .get(`/users/${postResponseId}`)
        .expect(500);
      expect(getResponse.body).toStrictEqual({
        message: `User ${postResponseId}, may not exist.`,
      });
    });
  });

  describe("Error handling", () => {
    test("Deleting user that does not exist fails", async () => {
      const userIdThatProbablyDoesNotExist = 8675309;
      const deleteResponse = await request(app)
        .delete(`/users/${userIdThatProbablyDoesNotExist}`)
        .expect(400);

      expect(deleteResponse.body).toStrictEqual({
        message: `User with id ${userIdThatProbablyDoesNotExist} does not exist.`,
      });
    });

    test("Getting user that does not exist fails", async () => {
      const userIdThatProbablyDoesNotExist = 8675309;
      const getResponse = await request(app)
        .get(`/users/${userIdThatProbablyDoesNotExist}`)
        .expect(500);

      expect(getResponse.body).toStrictEqual({
        message: `User ${userIdThatProbablyDoesNotExist} may not exist.`,
      });
    });
  });
});
