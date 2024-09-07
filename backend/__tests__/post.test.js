// __tests__/posts.test.js
const request = require("supertest");
const app = require("../app");
const { pool } = require("../config/db");

// Helper function to create a test post
const createTestPost = async () => {
  const post = {
    user_id: 1, // Ensure this user exists in your database or create a test user first
    title: "Test Post",
    content: "This is a test post content.",
    price: 50.0,
  };

  const res = await request(app).post("/api/posts").send(post);
  return res.body; // Return the newly created post
};

// Helper function to delete a post by ID
const deletePostById = async (id) => {
  await request(app).delete(`/api/posts/${id}`);
};

describe("Posts API", () => {
  afterAll(async () => {
    await pool.end(); // Close the database pool connection
  });

  describe("GET /api/posts", () => {
    it("should return all posts", async () => {
      const res = await request(app).get("/api/posts");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/posts/:id", () => {
    it("should return a post by ID", async () => {
      const testPost = await createTestPost(); // Create a real post
      const res = await request(app).get(`/api/posts/${testPost.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(testPost.id);
      expect(res.body.title).toBe(testPost.title);
      await deletePostById(testPost.id); // Clean up
    });

    it("should return 404 for a non-existent post", async () => {
      const res = await request(app).get("/api/posts/999999"); // Assuming this ID does not exist
      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /api/posts", () => {
    it("should create a new post", async () => {
      const newPost = {
        user_id: 1, // Ensure user with this ID exists
        title: "New Post",
        content: "This is a new post.",
        price: 75.5,
      };
      const res = await request(app).post("/api/posts").send(newPost);
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe(newPost.title);
      expect(res.body.content).toBe(newPost.content);
      await deletePostById(res.body.id); // Clean up
    });

    it("should return 400 for missing required fields", async () => {
      const incompletePost = {
        user_id: 1, // Ensure user with this ID exists
        // Missing 'title' and 'content'
        price: 45.0,
      };
      const res = await request(app).post("/api/posts").send(incompletePost);
      expect(res.statusCode).toBe(400); // Assuming 400 Bad Request for missing fields
    });
  });

  describe("PUT /api/posts/:id", () => {
    it("should update an existing post", async () => {
      const testPost = await createTestPost(); // Create a real post
      const updatedPost = {
        user_id: 1, // Ensure user with this ID exists
        title: "Updated Post Title",
        content: "Updated content for the post.",
        price: 100.0,
      };
      const res = await request(app)
        .put(`/api/posts/${testPost.id}`)
        .send(updatedPost);
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(updatedPost.title);
      expect(res.body.content).toBe(updatedPost.content);
      await deletePostById(res.body.id); // Clean up
    });
  });

  describe("DELETE /api/posts/:id", () => {
    it("should delete an existing post", async () => {
      const testPost = await createTestPost(); // Create a real post
      const res = await request(app).delete(`/api/posts/${testPost.id}`);
      expect(res.statusCode).toBe(204); // No content
    });
  });
});
