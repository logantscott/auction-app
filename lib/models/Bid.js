const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  // ref to auction, user
  // price, quantity, accepted
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
    required: true,
    validate: [auctionValidator, 'This auction has expired!']
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
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

function auctionValidator(val) {
  return new Promise(function(resolve){
    let Auction = mongoose.model('Auction');
    Auction.findById((val), (err, auction) => {
      return resolve(auction.endDate < new Date() ? false : true);
    });
  });
}

module.exports = mongoose.model('Bid', bidSchema);
