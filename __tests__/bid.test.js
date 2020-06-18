const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');
const Bid = require('../lib/models/Bid');
const User = require('../lib/models/User');
const Auction = require('../lib/models/Auction');
const date = new Date();

describe('auction-app routes', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let users, auction, bids;
  beforeEach(async() => {
    users = await User
      .create([
        {
          email: 'user1@test.com',
          password: '1234'
        },
        {
          email: 'user2@test.com',
          password: '5678'
        },
        {
          email: 'user3@test.com',
          password: '9abc'
        }
      ]);

    auction = await Auction
      .create({
        user: users[2].id,
        title: 'my first auction',
        description: 'some boring thing being sold',
        quantity: 2,
        endDate: date
      })
      .then(res => {
        res.endDate = Date(res.endDate);
        return res;
      });
    
    bids = await Bid
      .create([
        {
          auction: auction.id,
          user: users[0].id,
          price: 31,
          quantity: 1,
          accepted: false
        },
        {
          auction: auction.id,
          user: users[1].id,
          price: 42,
          quantity: 1,
          accepted: false
        },
        {
          auction: auction.id,
          user: users[0].id,
          price: 43,
          quantity: 1,
          accepted: true
        }
      ]);
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });
  
  it('can create a bid', () => {
    return request(app)
      .post('/api/v1/bids')
      .send({
        auction: auction.id,
        user: users[0].id,
        price: 31,
        quantity: 1,
        accepted: false
      })
      .then(res => expect(res.body).toEqual({
        _id: expect.anything(),
        auction: auction.id,
        user: users[0].id,
        price: 31,
        quantity: 1,
        accepted: false,
        __v: 0
      }));
  });

  it('can get a bid by id with user and auction details', () => {
    return request(app)
      .get(`/api/v1/bids/${bids[2].id}`)
      .then(res => expect(res.body).toEqual({
        _id: expect.anything(),
        auction: {
          _id: auction.id,
          user: users[2].id,
          title: 'my first auction',
          description: 'some boring thing being sold',
          quantity: 2,
          endDate: JSON.parse(JSON.stringify(date)),
          __v: 0
        },
        user: {
          _id: users[0].id,
          email: 'user1@test.com'
        },
        price: 43,
        quantity: 1,
        accepted: true,
        __v: 0
      }));
  });

  it('can delete a bid', () => {
    return expect('hi').toBe('bye');
  });
});
