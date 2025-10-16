const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  profileImage: { type: String }, // path to uploads/...
  monthlyBudget: { type: Number, default: 0 },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
