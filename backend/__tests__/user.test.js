const request = require("supertest");
const app = require("../app");
const { pool } = require("../config/db");

const createTestUser = async () => {
  const user = {
    username: "testuser",
    email: "testuser@test.com",
    password_hash: "testpassword",
    first_name: "Test",
    last_name: "User",
    profile_picture: "profile.jpg",
    date_of_birth: "1990-01-01",
    phone_number: "1234567890",
    address: "123 Test St",
    is_active: true,
    is_verified: true,
  };

  const res = await request(app).post("/api/users").send(user);
  return res.body; // Return the newly created user
};

const deleteUserById = async (id) => {
  await request(app).delete(`/api/users/${id}`);
};

describe("Test application", () => {
  test("Not found for site 404", async () => {
    const res = await request(app).get("/wrong-endpoint");
    expect(res.statusCode).toEqual(404);
  });

  test("Get all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toEqual(200);
  });

  test("Create a new user", async () => {
    const newUser = {
      username: "newuser",
      email: "newuser@example.com",
      password_hash: "newhashedpassword",
      first_name: "New",
      last_name: "User",
      profile_picture: "newprofile.jpg",
      date_of_birth: "1995-05-05",
      phone_number: "6177089241",
      address: "456 New St",
      is_active: true,
      is_verified: true,
    };
    const res = await request(app).post("/api/users").send(newUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body.username).toEqual(newUser.username);
    expect(res.body.email).toEqual(newUser.email);
    await deleteUserById(res.body.id); // Ensure this operation completes
  });

  test("Update an existing user", async () => {
    const testUser = await createTestUser(); // Create a real user
    const updatedUser = {
      username: "updateduser",
      email: "updateduser@example.com",
      password_hash: "updatedhashedpassword",
      first_name: "Updated",
      last_name: "User",
      profile_picture: "updatedprofile.jpg",
      date_of_birth: "1992-02-02",
      phone_number: "6179161076",
      address: "789 Updated St",
      is_active: false,
      is_verified: true,
    };
    const res = await request(app)
      .put(`/api/users/${testUser.id}`)
      .send(updatedUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toEqual(updatedUser.username);
    expect(res.body.email).toEqual(updatedUser.email);
    expect(res.body.is_active).toEqual(updatedUser.is_active);
    expect(res.body.is_verified).toEqual(updatedUser.is_verified);
    expect(res.body.phone_number).toEqual(updatedUser.phone_number);
    expect(res.body.address).toEqual(updatedUser.address);
    expect(res.body.profile_picture).toEqual(updatedUser.profile_picture);
    await deleteUserById(res.body.id); // Ensure this operation completes
  });

  test("Delete an existing user", async () => {
    const testUser = await createTestUser(); // Create a real user
    const res = await request(app).delete(`/api/users/${testUser.id}`);
    expect(res.statusCode).toEqual(204);
  });
});

afterAll(async () => {
  await pool.end();
});
