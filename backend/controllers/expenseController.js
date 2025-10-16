const Expense = require('../models/Expense');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

/**
 * @desc Add a new expense
 * @route POST /api/expense/add
 */
exports.addExpense = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ success: false, errors: errors.array() });

    const { title, amount, category, date, note } = req.body;

    const expense = new Expense({
      userId: req.user.id,
      title,
      amount,
      category,
      date,
      note
    });

    await expense.save();

    res.status(201).json({ success: true, expense });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Get all expenses with filtering and pagination
 * @route GET /api/expense/all
 */
exports.getAllExpenses = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const filter = { userId };

    if (req.query.category) filter.category = req.query.category;

    // Date range filter
    if (req.query.from || req.query.to) {
      filter.date = {};
      if (req.query.from) filter.date.$gte = new Date(req.query.from);
      if (req.query.to) filter.date.$lte = new Date(req.query.to);
    }

    // Amount range filter
    if (req.query.minAmount || req.query.maxAmount) {
      filter.amount = {};
      if (req.query.minAmount) filter.amount.$gte = Number(req.query.minAmount);
      if (req.query.maxAmount) filter.amount.$lte = Number(req.query.maxAmount);
    }

    const total = await Expense.countDocuments(filter);
    const expenses = await Expense.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ success: true, total, page, limit, expenses });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Update an expense by ID
 * @route PUT /api/expense/:id
 */
exports.updateExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(expenseId))
      return res.status(400).json({ success: false, message: 'Invalid ID' });

    const expense = await Expense.findOne({
      _id: expenseId,
      userId: req.user.id
    });

    if (!expense)
      return res
        .status(404)
        .json({ success: false, message: 'Expense not found' });

    const updates = (({ title, amount, category, date, note }) => ({
      title,
      amount,
      category,
      date,
      note
    }))(req.body);

    Object.keys(updates).forEach(
      key => updates[key] === undefined && delete updates[key]
    );

    const updated = await Expense.findByIdAndUpdate(
      expenseId,
      { $set: updates },
      { new: true }
    );

    res.json({ success: true, expense: updated });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Delete an expense by ID
 * @route DELETE /api/expense/:id
 */
exports.deleteExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(expenseId))
      return res.status(400).json({ success: false, message: 'Invalid ID' });

    const expense = await Expense.findOneAndDelete({
      _id: expenseId,
      userId: req.user.id
    });

    if (!expense)
      return res
        .status(404)
        .json({ success: false, message: 'Expense not found' });

    res.json({ success: true, message: 'Expense deleted' });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Get expense summary for a given month/year
 * @route GET /api/expense/summary
 */
exports.getSummary = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id); // ✅ fixed line

    const year = parseInt(req.query.year, 10) || new Date().getFullYear();
    const month =
      req.query.month !== undefined
        ? parseInt(req.query.month, 10)
        : new Date().getMonth() + 1; // 1-12

    // Start & end of the selected month
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59, 999);

    // 1️⃣ Total per category
    const expensesByCategory = await Expense.aggregate([
      { $match: { userId, date: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: '$category',
          totalByCategory: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { totalByCategory: -1 } }
    ]);

    // 2️⃣ Total amount for the month
    const totalObj = await Expense.aggregate([
      { $match: { userId, date: { $gte: start, $lte: end } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const total = totalObj.length ? totalObj[0].total : 0;

    // 3️⃣ Daily spending for charts
    const daily = await Expense.aggregate([
      { $match: { userId, date: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: { $dayOfMonth: '$date' },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    // ✅ Success response
    res.json({
      success: true,
      total,
      byCategory: expensesByCategory,
      daily
    });
  } catch (err) {
    console.error('Error in getSummary:', err.message);
    next(err);
  }
};
