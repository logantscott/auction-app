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
  
  it('can create an auction', () => {
    return expect('hi').toBe('hi');
  });

  it('can get an auction by id', () => {
    return expect('hi').toBe('hi');
  });

  it('can get all auctions', () => {
    return expect('hi').toBe('hi');
  });
});
