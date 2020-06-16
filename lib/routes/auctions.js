const { Router } = require('express');
const Auction = require('../models/Auction');

module.exports = Router()

  // post - create
  .post('/', (req, res, next) => {
    Auction
      .create(req.body)
      .then(auction => res.send(auction))
      .catch(next);
  });

  // getbyid


  // get - get all auctions
