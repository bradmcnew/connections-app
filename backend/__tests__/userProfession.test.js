const request = require("supertest");
const app = require("../app");
const { pool } = require("../config/db");

// Helper function to create a test user profession
const createTestUserProfession = async (userId, professionId) => {
  const userProfession = {
    user_id: userId,
    profession_id: professionId,
  };

  const res = await request(app)
    .post("/api/user-professions")
    .send(userProfession);
  return res.body; // Return the newly created user profession
};

// Helper function to delete a user profession by ID
const deleteUserProfessionById = async (user_id, profession_id) => {
  const res = await request(app).delete(
    `/api/user-professions/users/${user_id}/professions/${profession_id}`
  );
  return res;
};

describe("User Professions API", () => {
  afterAll(async () => {
    await pool.end(); // Close the database pool connection
  });

  describe("GET /api/user-professions", () => {
    describe("/users/:userId/professions", () => {
      it("should return all professions for a specific user", async () => {
        // Replace with valid user ID for testing
        const userId = 1;
        const res = await request(app).get(
          `/api/user-professions/users/${userId}/professions`
        );
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      });
    });

    describe("/professions/:professionId/users", () => {
      it("should return all users for a specific profession", async () => {
        // Replace with valid profession ID for testing
        const professionId = 17;
        const res = await request(app).get(
          `/api/user-professions/professions/${professionId}/users`
        );
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      });

      it("should return an empty array for a non-existent user profession", async () => {
        const res = await request(app).get(
          "/api/user-professions/users/99999/professions"
        ); // Assuming this ID does not exist
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
      });
    });
  });

  describe("POST /api/user-professions", () => {
    it("should create a new user profession", async () => {
      // Replace with valid user and profession IDs for testing
      const userId = 1;
      const professionId = 17;
      const newUserProfession = {
        user_id: userId,
        profession_id: professionId,
      };
      const res = await request(app)
        .post("/api/user-professions")
        .send(newUserProfession);
      expect(res.statusCode).toBe(201);
      expect(res.body.user_id).toBe(newUserProfession.user_id);
      expect(res.body.profession_id).toBe(newUserProfession.profession_id);
      // Cleanup
      const deleteRes = await deleteUserProfessionById(userId, professionId);
      expect(deleteRes.statusCode).toBe(204);
    });

    it("should return 400 for missing required fields", async () => {
      const incompleteUserProfession = {
        // Missing 'user_id' and 'profession_id'
      };
      const res = await request(app)
        .post("/api/user-professions")
        .send(incompleteUserProfession);
      expect(res.statusCode).toBe(400); // Assuming 400 Bad Request for missing fields
    });
  });

  describe("DELETE /api/user-professions/users/:userId/professions/:professionId", () => {
    it("should delete an existing user profession", async () => {
      // Replace with valid user and profession IDs for testing
      const userId = 2;
      const professionId = 18;
      const testUserProfession = await createTestUserProfession(
        userId,
        professionId
      ); // Create a real user profession
      const res = await request(app).delete(
        `/api/user-professions/users/${userId}/professions/${professionId}`
      );
      expect(res.statusCode).toBe(204); // No content
    });
  });
});
