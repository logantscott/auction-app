const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.passwordHash;
    }
  }
});

userSchema.virtual('password').set(function(password) {
  this.passwordHash = bcrypt.hashSync(password, +process.env.SALT_ROUNDS || 8);
});

userSchema.methods.compare = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

// check if user exists
// then check password
userSchema.statics.authorized = function(email, password) {
  return this.findOne({ email })
    .then(user => {
      if(!user) {
        throw new Error('Invalid Email/Password');
      }

      if(!user.compare(password)) {
        throw new Error('Invalid Email/Password');
      }

      return user;
    });
};

module.exports = mongoose.model('User', userSchema);
