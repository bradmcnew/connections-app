const request = require("supertest");
const app = require("../app");
const { pool } = require("../config/db");

// Helper function to create a test school
const createTestSchool = async () => {
  const school = {
    name: "Test School",
  };

  const res = await request(app).post("/api/schools").send(school);
  return res.body; // Return the newly created school
};

// Helper function to delete a school by ID
const deleteSchoolById = async (id) => {
  await request(app).delete(`/api/schools/${id}`);
};

describe("Schools API", () => {
  afterAll(async () => {
    await pool.end(); // Close the database pool connection
  });

  describe("GET /api/schools", () => {
    it("should return all schools", async () => {
      const res = await request(app).get("/api/schools");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/schools/:id", () => {
    it("should return a school by ID", async () => {
      const testSchool = await createTestSchool(); // Create a real school
      const res = await request(app).get(`/api/schools/${testSchool.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(testSchool.id);
      expect(res.body.name).toBe(testSchool.name); // Check that the name matches
      await deleteSchoolById(testSchool.id); // Clean up
    });

    it("should return 404 for a non-existent school", async () => {
      const res = await request(app).get("/api/schools/999999"); // Assuming this ID does not exist
      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /api/schools", () => {
    it("should create a new school", async () => {
      const newSchool = {
        name: "New School",
      };
      const res = await request(app).post("/api/schools").send(newSchool);
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe(newSchool.name);
      await deleteSchoolById(res.body.id); // Clean up
    });

    it("should return 400 for missing required fields", async () => {
      const incompleteSchool = {
        // Missing 'name'
      };
      const res = await request(app)
        .post("/api/schools")
        .send(incompleteSchool);
      expect(res.statusCode).toBe(400); // Assuming 400 Bad Request for missing fields
    });
  });

  describe("PUT /api/schools/:id", () => {
    it("should update an existing school", async () => {
      const testSchool = await createTestSchool(); // Create a real school
      const updatedSchool = {
        name: "Updated School",
      };
      const res = await request(app)
        .put(`/api/schools/${testSchool.id}`)
        .send(updatedSchool);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(updatedSchool.name);
      await deleteSchoolById(res.body.id); // Clean up
    });
  });

  describe("DELETE /api/schools/:id", () => {
    it("should delete an existing school", async () => {
      const testSchool = await createTestSchool(); // Create a real school
      const res = await request(app).delete(`/api/schools/${testSchool.id}`);
      expect(res.statusCode).toBe(204); // No content
    });
  });
});
