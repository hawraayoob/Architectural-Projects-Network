const request = require('supertest');
const app = require('../server'); // your express app
const User = require('../models/user');
const mongoose = require('mongoose');

describe('Auth Tests', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/testdb');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test('Register new user', async () => {
    const res = await request(app)
      .post('/users') 
      .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Login user', async () => {
    // Create user first
    const user = new User({ name: 'Test User', email: 'test@example.com', password: 'password123' });
    await user.save();

    const res = await request(app)
      .post('/users/login')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Login fails with wrong password', async () => {
    const user = new User({ name: 'Test User', email: 'test@example.com', password: 'password123' });
    await user.save();

    const res = await request(app)
      .post('/users/login')
      .send({ email: 'test@example.com', password: 'wrongpass' });
    expect(res.statusCode).toBe(400);
  });
});
