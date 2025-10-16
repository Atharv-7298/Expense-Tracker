const express = require("express");
const { protect } = require("../middleware/auth");
const {
  addIncome,
  getAllIncomes,
  getIncomeSummary,
  deleteIncome, // ✅ add this
} = require("../controllers/incomeController");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/all", protect, getAllIncomes);
router.get("/summary", protect, getIncomeSummary);
router.delete("/:id", protect, deleteIncome); // ✅ add delete route

module.exports = router;
