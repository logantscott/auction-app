const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  // ref to user
  // title, description, quantity, end date/time
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  endDate: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Auction', auctionSchema);
