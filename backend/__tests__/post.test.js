const request = require("supertest");
const app = require("../app");
const { pool } = require("../config/db");

// Helper function to create a test post
const createTestPost = async () => {
  const post = {
    user_id: 1, // Make sure this user exists in your database or create a test user first
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
  // Test for GET /api/posts (Get all posts)
  test("Get all posts", async () => {
    const res = await request(app).get("/api/posts");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // Test for GET /api/posts/:id (Get post by ID)
  test("Get a post by ID", async () => {
    const testPost = await createTestPost(); // Create a real post
    const res = await request(app).get(`/api/posts/${testPost.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(testPost.id);
    expect(res.body.title).toEqual(testPost.title);
    await deletePostById(testPost.id); // Clean up
  });

  // Test for POST /api/posts (Create a new post)
  test("Create a new post", async () => {
    const newPost = {
      user_id: 1, // Ensure user with this ID exists
      title: "New Post",
      content: "This is a new post.",
      price: 75.5,
    };
    const res = await request(app).post("/api/posts").send(newPost);
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual(newPost.title);
    expect(res.body.content).toEqual(newPost.content);
    await deletePostById(res.body.id); // Clean up
  });

  // Test for PUT /api/posts/:id (Update an existing post)
  test("Update an existing post", async () => {
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
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual(updatedPost.title);
    expect(res.body.content).toEqual(updatedPost.content);
    await deletePostById(res.body.id); // Clean up
  });

  // Test for DELETE /api/posts/:id (Delete a post)
  test("Delete an existing post", async () => {
    const testPost = await createTestPost(); // Create a real post
    const res = await request(app).delete(`/api/posts/${testPost.id}`);
    expect(res.statusCode).toEqual(204); // No content
  });

  // Edge Case: Attempt to get a non-existent post
  test("Get a non-existent post", async () => {
    const res = await request(app).get("/api/posts/999999"); // Assuming this ID does not exist
    expect(res.statusCode).toEqual(404);
  });

  // Edge Case: Create a post with missing required fields
  test("Create a post with missing required fields", async () => {
    const incompletePost = {
      user_id: 1, // Ensure user with this ID exists
      // Missing 'title' and 'content'
      price: 45.0,
    };
    const res = await request(app).post("/api/posts").send(incompletePost);
    expect(res.statusCode).toEqual(400); // Assuming 400 Bad Request for missing fields
  });
});

afterAll(async () => {
  await pool.end();
});
