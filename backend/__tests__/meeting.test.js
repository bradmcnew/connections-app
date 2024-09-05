// __tests__/meeting.test.js
const request = require("supertest");
const app = require("../app"); // Import the Express app
const { pool } = require("../config/db");

describe("Meetings API", () => {
  // Test data to use across multiple tests
  const validMeetingData = {
    post_id: 2, // Should reference a valid post
    user_id: 1, // Should reference a valid user
    scheduled_time: "2025-10-19 10:23:54+02", // Valid TIMESTAMPTZ
    status: "pending",
  };

  let createdMeetingId; // To store the ID of the created meeting

  it("should get all meetings", async () => {
    const res = await request(app).get("/api/meetings");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get a meeting by ID", async () => {
    const res = await request(app).get("/api/meetings/2"); // Assuming there is a meeting with ID 2
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", 2);
    expect(res.body).toHaveProperty("post_id");
    expect(res.body).toHaveProperty("user_id");
    expect(res.body).toHaveProperty("scheduled_time");
    expect(res.body).toHaveProperty("status");
  });

  it("should create a new meeting", async () => {
    const res = await request(app).post("/api/meetings").send(validMeetingData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.post_id).toBe(validMeetingData.post_id);
    expect(res.body.user_id).toBe(validMeetingData.user_id);

    // Convert scheduled_time from the response to a Date object
    const responseTime = new Date(res.body.scheduled_time);

    // Convert validMeetingData.scheduled_time to a Date object
    const expectedTime = new Date(validMeetingData.scheduled_time);

    // Compare the ISO strings
    expect(responseTime.toISOString()).toBe(expectedTime.toISOString());

    expect(res.body.status).toBe(validMeetingData.status);

    // Store the created meeting ID for further tests
    createdMeetingId = res.body.id;
  });

  it("should update an existing meeting", async () => {
    const updatedMeetingData = {
      post_id: 1, // Updating to a different valid post
      user_id: 2, // Updating to a different valid user
      scheduled_time: "2037-10-19 10:23:54+02", // Updated scheduled time
      status: "confirmed", // Updated status
    };

    const res = await request(app)
      .put(`/api/meetings/${createdMeetingId}`)
      .send(updatedMeetingData);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdMeetingId);
    expect(res.body.post_id).toBe(updatedMeetingData.post_id);
    expect(res.body.user_id).toBe(updatedMeetingData.user_id);
    // Convert scheduled_time from the response to a Date object
    const responseTime = new Date(res.body.scheduled_time);
    // Convert updatedMeetingData.scheduled_time to a Date object or UTC string
    const expectedTime = new Date(updatedMeetingData.scheduled_time);
    // Compare the ISO strings
    expect(responseTime.toISOString()).toBe(expectedTime.toISOString());
    expect(res.body.status).toBe(updatedMeetingData.status);
  });

  it("should delete an existing meeting", async () => {
    const res = await request(app).delete(`/api/meetings/${createdMeetingId}`);
    expect(res.statusCode).toBe(204); // Assuming 204 No Content for successful deletion
  });

  it("should return 404 for a non-existent meeting", async () => {
    const res = await request(app).get("/api/meetings/9999"); // Assuming ID 9999 does not exist
    expect(res.statusCode).toBe(404);
  });

  it("should return 400 when creating a meeting with missing required fields", async () => {
    const incompleteMeetingData = {
      user_id: 1, // Missing post_id, scheduled_time, and status
    };

    const res = await request(app)
      .post("/api/meetings")
      .send(incompleteMeetingData);
    expect(res.statusCode).toBe(400); // Assuming 400 Bad Request for missing fields
  });

  //   it("should return 400 when creating a meeting with invalid fields", async () => {
  //     const invalidMeetingData = {
  //       post_id: 9999, // Invalid post_id
  //       user_id: 9999, // Invalid user_id
  //       scheduled_time: "invalid-timestamp", // Invalid TIMESTAMPTZ
  //       status: "unknown-status", // Invalid status
  //     };

  //     const res = await request(app)
  //       .post("/api/meetings")
  //       .send(invalidMeetingData);
  //     expect(res.statusCode).toBe(400); // Assuming 400 Bad Request for invalid fields
  //   });
});

afterAll(async () => {
  await pool.end();
});
