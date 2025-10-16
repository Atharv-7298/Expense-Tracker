const Income = require("../models/Income");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

exports.addIncome = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ success: false, errors: errors.array() });

    const { source, amount, category, date, note } = req.body;

    const income = new Income({
      userId: req.user.id,
      source,
      amount,
      category,
      date,
      note,
    });

    await income.save();
    res.status(201).json({ success: true, income });
  } catch (err) {
    next(err);
  }
};

exports.getAllIncomes = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    res.json({ success: true, incomes });
  } catch (err) {
    next(err);
  }
};

exports.getIncomeSummary = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);

    const byCategory = await Income.aggregate([
      { $match: { userId, date: { $gte: start } } },
      { $group: { _id: "$category", totalByCategory: { $sum: "$amount" } } },
    ]);

    const daily = await Income.aggregate([
      { $match: { userId, date: { $gte: start } } },
      { $group: { _id: { $dayOfMonth: "$date" }, total: { $sum: "$amount" } } },
      { $sort: { "_id": 1 } },
    ]);

    const total = await Income.aggregate([
      { $match: { userId, date: { $gte: start } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      success: true,
      total: total[0]?.total || 0,
      byCategory,
      daily,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteIncome = async (req, res, next) => {
  try {
    const incomeId = req.params.id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(incomeId)) {
      return res.status(400).json({ success: false, message: "Invalid income ID" });
    }

    // Find and delete
    const deletedIncome = await Income.findOneAndDelete({
      _id: incomeId,
      userId: req.user.id, // only allow user to delete their own income
    });

    if (!deletedIncome) {
      return res.status(404).json({ success: false, message: "Income not found" });
    }

    res.json({ success: true, message: "Income deleted successfully" });
  } catch (err) {
    next(err);
  }
};
