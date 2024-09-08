const request = require("supertest");
const app = require("../app");
const { pool } = require("../config/db");

// Helper function to create a test role
const createTestRole = async () => {
  const role = {
    role_name: "Test Role",
  };

  const res = await request(app).post("/api/roles").send(role);
  return res.body; // Return the newly created role
};

// Helper function to delete a role by ID
const deleteRoleById = async (id) => {
  await request(app).delete(`/api/roles/${id}`);
};

describe("Roles API", () => {
  afterAll(async () => {
    await pool.end(); // Close the database pool connection
  });

  describe("GET /api/roles", () => {
    it("should return all roles", async () => {
      const res = await request(app).get("/api/roles");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/roles/:id", () => {
    it("should return a role by ID", async () => {
      const testRole = await createTestRole(); // Create a real role
      const res = await request(app).get(`/api/roles/${testRole.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(testRole.id);
      expect(res.body.role_name).toBe(testRole.role_name); // Check that the role_name matches
      await deleteRoleById(testRole.id); // Clean up
    });

    it("should return 404 for a non-existent role", async () => {
      const res = await request(app).get("/api/roles/999999"); // Assuming this ID does not exist
      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /api/roles", () => {
    it("should create a new role", async () => {
      const newRole = {
        role_name: "New Role",
      };
      const res = await request(app).post("/api/roles").send(newRole);
      expect(res.statusCode).toBe(201);
      expect(res.body.role_name).toBe(newRole.role_name);
      await deleteRoleById(res.body.id); // Clean up
    });

    it("should return 400 for missing required fields", async () => {
      const incompleteRole = {
        // Missing 'role_name'
      };
      const res = await request(app).post("/api/roles").send(incompleteRole);
      expect(res.statusCode).toBe(400); // Assuming 400 Bad Request for missing fields
    });
  });

  describe("PUT /api/roles/:id", () => {
    it("should update an existing role", async () => {
      const testRole = await createTestRole(); // Create a real role
      const updatedRole = {
        role_name: "Updated Role",
      };
      const res = await request(app)
        .put(`/api/roles/${testRole.id}`)
        .send(updatedRole);
      expect(res.statusCode).toBe(200);
      expect(res.body.role_name).toBe(updatedRole.role_name);
      await deleteRoleById(res.body.id); // Clean up
    });
  });

  describe("DELETE /api/roles/:id", () => {
    it("should delete an existing role", async () => {
      const testRole = await createTestRole(); // Create a real role
      const res = await request(app).delete(`/api/roles/${testRole.id}`);
      expect(res.statusCode).toBe(204); // No content
    });
  });
});
