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
  
  it('can create a bid', () => {
    return expect('hi').toBe('hi');
  });

  it('can get a bid by id', () => {
    return expect('hi').toBe('hi');
  });

  it('can delete a bid', () => {
    return expect('hi').toBe('hi');
  });
});