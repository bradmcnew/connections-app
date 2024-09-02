const express = require("express");
const router = express.Router();

// Import the controller functions for handling payment routes
const {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");

// Route to get all payments
// @route GET /api/payments
// @desc Fetches a list of all payments
router.get("/", getAllPayments);

// Route to get a single payment by its ID
// @route GET /api/payments/:id
// @desc Fetches details of a specific payment by ID
// @param {string} id - The ID of the payment
router.get("/:id", getPaymentById);

// Route to create a new payment
// @route POST /api/payments
// @desc Creates a new payment entry
// @body {object} payment data - The data required to create a new payment
router.post("/", createPayment);

// Route to update an existing payment
// @route PUT /api/payments/:id
// @desc Updates an existing payment's details by ID
// @param {string} id - The ID of the payment to update
// @body {object} updated payment data - The new data for the payment
router.put("/:id", updatePayment);

// Route to delete a payment by its ID
// @route DELETE /api/payments/:id
// @desc Deletes a specific payment by ID
// @param {string} id - The ID of the payment to delete
router.delete("/:id", deletePayment);

// Export the router to be used in the main app
module.exports = router;
