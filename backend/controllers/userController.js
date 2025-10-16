const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success:true, user });
  } catch (err) { next(err); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.monthlyBudget !== undefined) updates.monthlyBudget = req.body.monthlyBudget;

    // password change
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(req.body.password, salt);
    }

    // handle profile image
    if (req.file) {
      updates.profileImage = path.join('uploads', req.file.filename);
      // optional: delete old image
      const user = await User.findById(req.user.id);
      if (user && user.profileImage) {
        const oldPath = path.join(__dirname, '..', user.profileImage);
        fs.unlink(oldPath, (err) => { /* ignore */ });
      }
    }

    const updated = await User.findByIdAndUpdate(req.user.id, { $set: updates }, { new: true }).select('-password');
    res.json({ success:true, user: updated });
  } catch (err) { next(err); }
};
