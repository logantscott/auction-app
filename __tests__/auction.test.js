const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
const Auction = require('../lib/models/Auction');
const Bid = require('../lib/models/Bid');
const date = new Date();

describe('auction-app routes', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });


  let user;
  beforeEach(async() => {
    user = await User
      .create({
        email: 'logan@test.com',
        password: '1234'
      })
      .then(res => res);
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });
  
  it('can create an auction', async() => {
    return request(app)
      .post('/api/v1/auctions')
      .send({
        user: user.id,
        title: 'my first auction',
        description: 'some boring thing being sold',
        quantity: 2,
        endDate: date
      })
      .then(res => {
        res.body.endDate = Date(res.body.endDate);
        return res;
      })
      .then(async(res) => {
        // console.log(typeof(date), typeof(res.body.endDate));
        return expect(res.body).toEqual({
          _id: expect.anything(),
          user: user.id,
          title: 'my first auction',
          description: 'some boring thing being sold',
          quantity: 2,
          endDate: Date(date.toString()),
          __v: 0
        });
      });
  });

  it('can get all auctions', async() => {
    await Auction
      .create([
        {
          user: user.id,
          title: 'my first auction',
          description: 'some boring thing being sold',
          quantity: 2,
          endDate: date
        }, {
          user: user.id,
          title: 'my second auction',
          description: 'some boring thing being sold',
          quantity: 2,
          endDate: date
        }, {
          user: user.id,
          title: 'my third auction',
          description: 'some boring thing being sold',
          quantity: 2,
          endDate: date
        }
      ]);

    return request(app)
      .get('/api/v1/auctions')
      .send({})
      .then(auctions => {
        auctions.body.map(auction => {
          auction.endDate = Date(auction.endDate);
          return auction;
        });
        return auctions;
      })
      .then(res => expect(res.body).toEqual([
        {
          _id: expect.anything(),
          user: user.id,
          title: 'my first auction',
          description: 'some boring thing being sold',
          quantity: 2,
          endDate: Date(date.toString()),
          __v: 0
        }, {
          _id: expect.anything(),
          user: user.id,
          title: 'my second auction',
          description: 'some boring thing being sold',
          quantity: 2,
          endDate: Date(date.toString()),
          __v: 0
        }, {
          _id: expect.anything(),
          user: user.id,
          title: 'my third auction',
          description: 'some boring thing being sold',
          quantity: 2,
          endDate: Date(date.toString()),
          __v: 0
        }
      ]));
  });

  it('can get an auction by id and all bids', async() => {
    const auction = await Auction
      .create({
        user: user.id,
        title: 'my fourth auction',
        description: 'some boring thing being sold',
        quantity: 2,
        endDate: date
      });

    const bids = [
      {
        auction: auction.id,
        user: user.id,
        price: 31,
        quantity: 1,
        accepted: false
      },
      {
        auction: auction.id,
        user: user.id,
        price: 42,
        quantity: 1,
        accepted: false
      },
      {
        auction: auction.id,
        user: user.id,
        price: 43,
        quantity: 1,
        accepted: true
      }
    ];

    await Bid.create(bids);

    return request(app)
      .get(`/api/v1/auctions/${auction.id}`)
      .then(res => {
        res.body.endDate = Date(res.body.endDate);
        return res;
      })
      .then(res => expect(res.body).toEqual({
        _id: expect.anything(),
        user: user.id,
        title: 'my fourth auction',
        description: 'some boring thing being sold',
        quantity: 2,
        endDate: Date(date.toString()),
        bids: bids.map(bid => {
          bid._id = expect.anything();
          bid.__v = 0;
          return bid;
        }),
        __v: 0
      }));
  });
});
