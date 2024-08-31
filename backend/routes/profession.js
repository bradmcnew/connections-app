const express = require("express");
const router = express.Router();

const {
  getAllProfessions,
  getProfessionById,
  createProfession,
  updateProfession,
  deleteProfession,
} = require("../controllers/professionController");

router.get("/", getAllProfessions);
router.get("/:id", getProfessionById);
router.post("/", createProfession);
router.put("/:id", updateProfession);
router.delete("/:id", deleteProfession);

module.exports = router;
