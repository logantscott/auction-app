const { Router } = require('express');
const Auction = require('../models/Auction');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()

  // post - create
  .post('/', ensureAuth, (req, res, next) => {
    Auction
      .create(req.body)
      .then(auction => res.send(auction))
      .catch(next);
  })

  // getbyid
  .get('/', (req, res, next) => {
    Auction
      .find(req.query)
      .then(auctions => res.send(auctions))
      .catch(next);
  })

  // get - get all auctions
  .get('/:id', (req, res, next) => {
    Auction
      .findById(req.params.id)
      .populate('bids')
      .then(auction => res.send(auction))
      .catch(next);
  });
