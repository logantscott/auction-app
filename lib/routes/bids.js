const { Router } = require('express');
const Bid = require('../models/Bid');

module.exports = Router()
  // first route
  .post('/', (req, res, next) => {
    Bid
      .create(req.body)
      .then(bid => res.send(bid))
      .catch(next);
  })

  // post create
  .get('/:id', (req, res, next) => {
    Bid
      .findById(req.params.id)
      .populate('auction')
      .populate('user', 'email')
      .lean()
      .then(bid => res.send(bid))
      .catch(next);
  });

  // get by id - findbyid


  // delete
  