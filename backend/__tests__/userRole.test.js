const request = require("supertest");
const app = require("../app");
const { pool } = require("../config/db");

// Helper function to create a test user role
const createTestUserRole = async (userId, roleId) => {
  const userRole = {
    user_id: userId,
    role_id: roleId,
  };

  const res = await request(app).post("/api/user-roles").send(userRole);
  return res.body; // Return the newly created user role
};

// Helper function to delete a user role by ID
const deleteUserRoleById = async (userId, roleId) => {
  const res = await request(app).delete(
    `/api/user-roles/users/${userId}/roles/${roleId}`
  );
  return res;
};

describe("User Roles API", () => {
  afterAll(async () => {
    await pool.end(); // Close the database pool connection
  });

  describe("GET /api/user-roles", () => {
    describe("/users/:userId/roles", () => {
      it("should return all roles for a specific user", async () => {
        // Replace with valid user ID for testing
        const userId = 1;
        const res = await request(app).get(
          `/api/user-roles/users/${userId}/roles`
        );
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      });
    });

    describe("/roles/:roleId/users", () => {
      it("should return all users for a specific role", async () => {
        // Replace with valid role ID for testing
        const roleId = 17;
        const res = await request(app).get(
          `/api/user-roles/roles/${roleId}/users`
        );
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      });

      it("should return an empty array for a non-existent user role", async () => {
        const res = await request(app).get("/api/user-roles/users/99999/roles"); // Assuming this ID does not exist
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
      });
    });
  });

  describe("POST /api/user-roles", () => {
    it("should create a new user role", async () => {
      // Replace with valid user and role IDs for testing
      const userId = 1;
      const roleId = 14;
      const newUserRole = {
        user_id: userId,
        role_id: roleId,
      };
      const res = await request(app).post("/api/user-roles").send(newUserRole);
      expect(res.statusCode).toBe(201);
      expect(res.body.user_id).toBe(newUserRole.user_id);
      expect(res.body.role_id).toBe(newUserRole.role_id);

      // Cleanup
      const deleteRes = await deleteUserRoleById(userId, roleId);
      expect(deleteRes.statusCode).toBe(200);
    });

    it("should return 400 for missing required fields", async () => {
      const incompleteUserRole = {
        // Missing 'user_id' and 'role_id'
      };
      const res = await request(app)
        .post("/api/user-roles")
        .send(incompleteUserRole);
      expect(res.statusCode).toBe(400); // Assuming 400 Bad Request for missing fields
    });
  });

  describe("DELETE /api/user-roles/users/:userId/roles/:roleId", () => {
    it("should delete an existing user role", async () => {
      // Replace with valid user and role IDs for testing
      const userId = 3;
      const roleId = 13;
      const testUserRole = await createTestUserRole(userId, roleId); // Create a real user role
      const res = await request(app).delete(
        `/api/user-roles/users/${userId}/roles/${roleId}`
      );
      expect(res.statusCode).toBe(200); // User removed successfully
    });

    it("should return 404 when trying to delete a non-existent user role", async () => {
      const res = await request(app).delete(
        "/api/user-roles/users/99999/roles/99999"
      ); // Assuming these IDs do not exist
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Association not found");
    });
  });
});
