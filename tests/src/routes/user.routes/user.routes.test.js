const request = require("supertest");
const app = require("../../../../src/app");

const nameWithOneHundredAndOneChars =
  "JhpWY7DSfFQLU9HByQeXWLEBj96BmdeAzaNzqEBfQgReHbtfqVJOnyyPo1VlwbNttoHvJwrGSWXdWwp48AkQrw5pzQeY8W8sHnQ93";
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
      expect(deleteResponse.body).toStrictEqual({
        id: postResponse.body.id,
        name: postResponse.body.name,
      });

      const getResponse = await request(app)
        .get(`/users/${postResponseId}`)
        .expect(200);
      expect(getResponse.body).toStrictEqual("");
    });
  });

  describe("Error handling", () => {
    // We need to create a 'does user exist' check for these to work
    // test("Deleting user that does not exist fails", async () => {
    //   const userIdThatProbablyDoesNotExist = 8675309;
    //   const deleteResponse = await request(app)
    //     .delete(`/users/${userIdThatProbablyDoesNotExist}`)
    //     .expect(400);
    //   expect(deleteResponse.body).toStrictEqual({
    //     message: `User with id ${userIdThatProbablyDoesNotExist} does not exist.`,
    //   });
    // });
    // test("Getting user that does not exist fails", async () => {
    //   const userIdThatProbablyDoesNotExist = 8675309;
    //   const getResponse = await request(app)
    //     .get(`/users/${userIdThatProbablyDoesNotExist}`)
    //     .expect(500);
    //   expect(getResponse.body).toStrictEqual({
    //     message: `User ${userIdThatProbablyDoesNotExist} may not exist.`,
    //   });
    // });
  });

  describe("Schema", () => {
    describe("POST", () => {
      test("Name field should be string", async () => {
        const response = await request(app)
          .post("/users")
          .send({ name: 86593 })
          .expect(422);

        expect(response.body).toStrictEqual({
          data: {
            name: 86593,
          },
          message: '"name" must be a string',
          status: "error",
        });
      });
      test("Name field should have min 3 characters", async () => {
        const response = await request(app)
          .post("/users")
          .send({ name: "jo" })
          .expect(422);

        expect(response.body).toStrictEqual({
          data: {
            name: "jo",
          },
          message: '"name" length must be at least 3 characters long',
          status: "error",
        });
      });
      test("Name field should have max 100 characters", async () => {
        const response = await request(app)
          .post("/users")
          .send({ name: nameWithOneHundredAndOneChars })
          .expect(422);

        expect(response.body).toStrictEqual({
          data: {
            name: nameWithOneHundredAndOneChars,
          },
          message:
            '"name" length must be less than or equal to 100 characters long',
          status: "error",
        });
      });
      test("Name field is required", async () => {
        const response = await request(app).post("/users").send({}).expect(422);

        expect(response.body).toStrictEqual({
          data: {},
          message: '"name" is required',
          status: "error",
        });
      });
    });

    describe("PUT", () => {
      let exampleResponseId;
      beforeAll(async () => {
        let exampleResponse = await request(app)
          .post("/users")
          .send({ name: "Tsuki the cat" })
          .expect(200);
        exampleResponseId = exampleResponse.body.id;
      });

      test("Name field should be string", async () => {
        const response = await request(app)
          .put("/users")
          .send({ id: exampleResponseId, name: 86593 })
          .expect(422);

        expect(response.body).toStrictEqual({
          data: {
            id: exampleResponseId,
            name: 86593,
          },
          message: '"name" must be a string',
          status: "error",
        });
      });
      test("Name field should have min 3 characters", async () => {
        const response = await request(app)
          .put("/users")
          .send({ id: exampleResponseId, name: "jo" })
          .expect(422);

        expect(response.body).toStrictEqual({
          data: {
            id: exampleResponseId,
            name: "jo",
          },
          message: '"name" length must be at least 3 characters long',
          status: "error",
        });
      });
      test("Name field should have max 100 characters", async () => {
        const response = await request(app)
          .put("/users")
          .send({ id: exampleResponseId, name: nameWithOneHundredAndOneChars })
          .expect(422);

        expect(response.body).toStrictEqual({
          data: {
            id: exampleResponseId,
            name: nameWithOneHundredAndOneChars,
          },
          message:
            '"name" length must be less than or equal to 100 characters long',
          status: "error",
        });
      });
      test("Name field is required", async () => {
        const response = await request(app)
          .put("/users")
          .send({ id: exampleResponseId })
          .expect(422);

        expect(response.body).toStrictEqual({
          data: {
            id: exampleResponseId,
          },
          message: '"name" is required',
          status: "error",
        });
      });
    });
  });
});
