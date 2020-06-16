const { Router } = require('express');
const Bid = require('../models/Bid');

module.exports = Router()
  // first route
  .post('/', (req, res, next) => {
    Bid
      .create(req.body)
      .then(bid => res.send(bid))
      .catch(next);
  });

  // post create


  // get by id - findbyid


  // delete
  