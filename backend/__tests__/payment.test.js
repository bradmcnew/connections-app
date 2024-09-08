const request = require("supertest");
const app = require("../app");
const { pool } = require("../config/db");

// Helper function to create a test payment
const createTestPayment = async () => {
  const payment = {
    sender_id: 1, // Ensure this user exists in your database or create a test user first
    receiver_id: 2, // Ensure this user exists in your database or create a test user first
    amount: 100.5,
    status: "completed", // Ensure 'completed' is a valid value for payment_status
  };

  const res = await request(app).post("/api/payments").send(payment);
  return res.body; // Return the newly created payment
};

// Helper function to delete a payment by ID
const deletePaymentById = async (id) => {
  await request(app).delete(`/api/payments/${id}`);
};

describe("Payments API", () => {
  afterAll(async () => {
    await pool.end(); // Close the database pool connection
  });

  describe("GET /api/payments", () => {
    it("should return all payments", async () => {
      const res = await request(app).get("/api/payments");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/payments/:id", () => {
    it("should return a payment by ID", async () => {
      const testPayment = await createTestPayment(); // Create a real payment
      const res = await request(app).get(`/api/payments/${testPayment.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(testPayment.id);
      expect(parseFloat(res.body.amount)).toBeCloseTo(
        parseFloat(testPayment.amount)
      ); // Convert to number
      await deletePaymentById(testPayment.id); // Clean up
    });

    it("should return 404 for a non-existent payment", async () => {
      const res = await request(app).get("/api/payments/999999"); // Assuming this ID does not exist
      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /api/payments", () => {
    it("should create a new payment", async () => {
      const newPayment = {
        sender_id: 1, // Ensure user with this ID exists
        receiver_id: 2, // Ensure user with this ID exists
        amount: 150.75,
        status: "pending", // Ensure 'pending' is a valid value for payment_status
      };
      const res = await request(app).post("/api/payments").send(newPayment);
      expect(res.statusCode).toBe(201);
      expect(parseFloat(res.body.amount)).toBeCloseTo(newPayment.amount); // Convert to number
      expect(res.body.status).toBe(newPayment.status);
      await deletePaymentById(res.body.id); // Clean up
    });

    it("should return 400 for missing required fields", async () => {
      const incompletePayment = {
        sender_id: 1, // Ensure user with this ID exists
        // Missing 'receiver_id' and 'amount'
        status: "completed",
      };
      const res = await request(app)
        .post("/api/payments")
        .send(incompletePayment);
      expect(res.statusCode).toBe(400); // Assuming 400 Bad Request for missing fields
    });
  });

  describe("PUT /api/payments/:id", () => {
    it("should update an existing payment", async () => {
      const testPayment = await createTestPayment(); // Create a real payment
      const updatedPayment = {
        sender_id: 1, // Ensure user with this ID exists
        receiver_id: 2, // Ensure user with this ID exists
        amount: 200.0,
        status: "completed", // Ensure 'completed' is a valid value for payment_status
      };
      const res = await request(app)
        .put(`/api/payments/${testPayment.id}`)
        .send(updatedPayment);
      expect(res.statusCode).toBe(200);
      expect(parseFloat(res.body.amount)).toBeCloseTo(updatedPayment.amount); // Convert to number
      expect(res.body.status).toBe(updatedPayment.status);
      await deletePaymentById(res.body.id); // Clean up
    });
  });

  describe("DELETE /api/payments/:id", () => {
    it("should delete an existing payment", async () => {
      const testPayment = await createTestPayment(); // Create a real payment
      const res = await request(app).delete(`/api/payments/${testPayment.id}`);
      expect(res.statusCode).toBe(204); // No content
    });
  });
});
