const { Router } = require('express');
const Bid = require('../models/Bid');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  // post - create
  .post('/', ensureAuth, (req, res, next) => {
    Bid
      .create(req.body)
      .then(bid => res.send(bid))
      .catch(next);
  })

  // get by id - findbyid
  .get('/:id', (req, res, next) => {
    Bid
      .findById(req.params.id)
      .populate('auction')
      .populate('user', 'email')
      .lean()
      .then(bid => res.send(bid))
      .catch(next);
  })

  // delete
  .delete('/:id', ensureAuth, (req, res, next) => {
    Bid
      .findByIdAndDelete(req.params.id)
      .then(bid => res.send(bid))
      .catch(next);
  });
