const request = require("supertest");
const app = require("../app");
const { pool } = require("../config/db");

// Helper function to create a test profession
const createTestProfession = async () => {
  const profession = {
    name: "Test Profession",
  };

  const res = await request(app).post("/api/professions").send(profession);
  return res.body; // Return the newly created profession
};

// Helper function to delete a profession by ID
const deleteProfessionById = async (id) => {
  await request(app).delete(`/api/professions/${id}`);
};

describe("Professions API", () => {
  afterAll(async () => {
    await pool.end(); // Close the database pool connection
  });

  describe("GET /api/professions", () => {
    it("should return all professions", async () => {
      const res = await request(app).get("/api/professions");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/professions/:id", () => {
    it("should return a profession by ID", async () => {
      const testProfession = await createTestProfession(); // Create a real profession
      const res = await request(app).get(
        `/api/professions/${testProfession.id}`
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(testProfession.id);
      expect(res.body.name).toBe(testProfession.name); // Check that the name matches
      await deleteProfessionById(testProfession.id); // Clean up
    });

    it("should return 404 for a non-existent profession", async () => {
      const res = await request(app).get("/api/professions/999999"); // Assuming this ID does not exist
      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /api/professions", () => {
    it("should create a new profession", async () => {
      const newProfession = {
        name: "New Profession",
      };
      const res = await request(app)
        .post("/api/professions")
        .send(newProfession);
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe(newProfession.name);
      await deleteProfessionById(res.body.id); // Clean up
    });

    it("should return 400 for missing required fields", async () => {
      const incompleteProfession = {
        // Missing 'name'
      };
      const res = await request(app)
        .post("/api/professions")
        .send(incompleteProfession);
      expect(res.statusCode).toBe(400); // Assuming 400 Bad Request for missing fields
    });
  });

  describe("PUT /api/professions/:id", () => {
    it("should update an existing profession", async () => {
      const testProfession = await createTestProfession(); // Create a real profession
      const updatedProfession = {
        name: "Updated Profession",
      };
      const res = await request(app)
        .put(`/api/professions/${testProfession.id}`)
        .send(updatedProfession);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(updatedProfession.name);
      await deleteProfessionById(res.body.id); // Clean up
    });
  });

  describe("DELETE /api/professions/:id", () => {
    it("should delete an existing profession", async () => {
      const testProfession = await createTestProfession(); // Create a real profession
      const res = await request(app).delete(
        `/api/professions/${testProfession.id}`
      );
      expect(res.statusCode).toBe(204); // No content
    });
  });
});
