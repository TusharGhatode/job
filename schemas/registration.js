const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registration = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
  },
  tokens: [String],
}, {
  timestamps: true,
});

// Ensure that the combination of email and role is unique
registration.index({ email: 1, role: 1 }, { unique: true });

const registrationSchema = mongoose.model('Userlogins', registration);
module.exports = registrationSchema;
