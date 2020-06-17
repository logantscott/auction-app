const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

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
  
  it('can create an auction', () => {
    return request(app)
      .post('/api/v1/auctions')
      .send({
        user: user.id,
        title: 'my first auction',
        description: 'some boring thing being sold',
        quantity: 2,
        endDate: Date.now()
      })
      .then(res => expect(res.body).toEqual({
        _id: expect.anything(),
        user: user.id,
        title: 'my first auction',
        description: 'some boring thing being sold',
        quantity: 2,
        endDate: expect.anything(),
        __v: 0
      }));
  });

  it('can get an auction by id', () => {
    return expect('hi').toBe('bye');
  });

  it('can get all auctions', () => {
    return expect('hi').toBe('hi');
  });
});
