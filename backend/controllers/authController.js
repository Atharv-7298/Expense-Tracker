const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const path = require('path');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ success:false, errors: errors.array() });

    const { name, email, password, monthlyBudget } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ success:false, message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const profileImage = req.file ? path.join('uploads', req.file.filename) : undefined;

    user = new User({
      name,
      email,
      password: hashed,
      profileImage,
      monthlyBudget: monthlyBudget || 0
    });

    await user.save();

    const token = createToken(user._id);
    res.status(201).json({ success:true, token, user: { id: user._id, name: user.name, email: user.email, profileImage: user.profileImage, monthlyBudget: user.monthlyBudget } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ success:false, errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success:false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success:false, message: 'Invalid credentials' });

    const token = createToken(user._id);
    res.json({ success:true, token, user: { id: user._id, name: user.name, email: user.email, profileImage: user.profileImage, monthlyBudget: user.monthlyBudget } });
  } catch (err) {
    next(err);
  }
};
