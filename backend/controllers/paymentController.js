const { parse } = require("dotenv");
const {
  handleGetAllRequest,
  handleGetByIdRequest,
  handleDeleteRequest,
  handleCreateRequest,
  handleUpdateRequest,
} = require("../utils/controllerHelpers");

// @desc Create a new payment
// @route POST /api/payments
const createPayment = async (req, res, next) => {
  try {
    const { sender_id, receiver_id, amount, status } = req.body;
    const newPayment = await handleCreateRequest("payments")({
      sender_id,
      receiver_id,
      amount: parseFloat(amount),
      status,
    });
    res.status(201).json(newPayment);
  } catch (err) {
    next(err);
  }
};

// @desc Update a payment
// @route PUT /api/payments/:id
const updatePayment = async (req, res, next) => {
  try {
    const paymentId = req.params.id;
    const { sender_id, receiver_id, amount, status } = req.body;
    const updatedPayment = await handleUpdateRequest("payments")(paymentId, {
      sender_id,
      receiver_id,
      amount: parseFloat(amount),
      status,
    });
    res.status(200).json(updatedPayment);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPayments: handleGetAllRequest("payments"),
  getPaymentById: handleGetByIdRequest("payments"),
  createPayment,
  updatePayment,
  deletePayment: handleDeleteRequest("payments"),
};
