const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  // ref to auction, user
  // price, quantity, accepted
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  accepted: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Auction', bidSchema);
