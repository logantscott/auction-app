const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // email, passwordHash
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
