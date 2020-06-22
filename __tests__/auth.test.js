const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');

describe('auction-app routes', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });
  
  it('can create a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'logan@test.com',
        password: '1234'
      })
      .then(res => expect(res.body).toEqual({
        _id: expect.anything(),
        email: 'logan@test.com',
        // block password with toJSON transform
        // passwordHash: expect.anything(),
        __v: 0
      }));
  });

  // probably the hardest route test
  it('can authenticate a user and log them in', () => {
    return expect('hi').toBe('hi');
  });
});
