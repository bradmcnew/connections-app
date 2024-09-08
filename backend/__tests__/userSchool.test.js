const request = require("supertest");
const app = require("../app");
const { pool } = require("../config/db");

// Helper function to create a test user-school association
const createTestUserSchool = async (userId, schoolId) => {
  const userSchool = {
    user_id: userId,
    school_id: schoolId,
  };

  const res = await request(app).post("/api/user-schools").send(userSchool);
  return res.body; // Return the newly created user-school association
};

// Helper function to delete a user-school association by ID
const deleteUserSchoolById = async (userId, schoolId) => {
  const res = await request(app).delete(
    `/api/user-schools/users/${userId}/schools/${schoolId}`
  );
  return res;
};

describe("User Schools API", () => {
  afterAll(async () => {
    await pool.end(); // Close the database pool connection
  });

  describe("GET /api/user-schools", () => {
    describe("/users/:userId/schools", () => {
      it("should return all schools for a specific user", async () => {
        // Replace with a valid user ID for testing
        const userId = 1;
        const res = await request(app).get(
          `/api/user-schools/users/${userId}/schools`
        );
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      });
    });

    describe("/schools/:schoolId/users", () => {
      it("should return all users for a specific school", async () => {
        // Replace with a valid school ID for testing
        const schoolId = 17;
        const res = await request(app).get(
          `/api/user-schools/schools/${schoolId}/users`
        );
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      });

      it("should return an empty array for a non-existent user-school association", async () => {
        const res = await request(app).get(
          "/api/user-schools/users/99999/schools"
        ); // Assuming this ID does not exist
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
      });
    });
  });

  describe("POST /api/user-schools", () => {
    it("should create a new user-school association", async () => {
      // Replace with valid user and school IDs for testing
      const userId = 1;
      const schoolId = 17;
      const newUserSchool = {
        user_id: userId,
        school_id: schoolId,
      };
      const res = await request(app)
        .post("/api/user-schools")
        .send(newUserSchool);
      expect(res.statusCode).toBe(201);
      expect(res.body.user_id).toBe(newUserSchool.user_id);
      expect(res.body.school_id).toBe(newUserSchool.school_id);

      // Cleanup
      const deleteRes = await deleteUserSchoolById(userId, schoolId);
      expect(deleteRes.statusCode).toBe(200);
    });

    it("should return 400 for missing required fields", async () => {
      const incompleteUserSchool = {
        // Missing 'user_id' and 'school_id'
      };
      const res = await request(app)
        .post("/api/user-schools")
        .send(incompleteUserSchool);
      expect(res.statusCode).toBe(400); // Assuming 400 Bad Request for missing fields
    });
  });

  describe("DELETE /api/user-schools/users/:userId/schools/:schoolId", () => {
    it("should delete an existing user-school association", async () => {
      // Replace with valid user and school IDs for testing
      const userId = 3;
      const schoolId = 18;
      const testUserSchool = await createTestUserSchool(userId, schoolId); // Create a real user-school association
      const res = await request(app).delete(
        `/api/user-schools/users/${userId}/schools/${schoolId}`
      );
      expect(res.statusCode).toBe(200); // Association removed successfully
    });

    it("should return 404 when trying to delete a non-existent user-school association", async () => {
      const res = await request(app).delete(
        "/api/user-schools/users/99999/schools/99999"
      ); // Assuming these IDs do not exist
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Association not found");
    });
  });
});
