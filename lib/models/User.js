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
}, {
  virtuals: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.passwordHash;
    }
  }
});

// userSchema.virtual

module.exports = mongoose.model('User', userSchema);
