const express = require("express");
const router = express.Router();

const {
  getAllSchools,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool,
} = require("../controllers/schoolController");

router.get("/", getAllSchools);
router.get("/:id", getSchoolById);
router.post("/", createSchool);
router.put("/:id", updateSchool);
router.delete("/:id", deleteSchool);

module.exports = router;
