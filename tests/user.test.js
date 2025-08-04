const request = require('supertest');
const app = require('../server');
const User = require('../models/user');
const mongoose = require('mongoose');

describe('User CRUD Tests', () => {
  let token;
  let userId;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/testdb');
    // Register user and get token
    const res = await request(app)
      .post('/users')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });
    token = res.body.token;
    userId = res.body.user._id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test('Get user profile', async () => {
    const res = await request(app)
      .get('/users/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });

  test('Update user', async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Name' });
    expect(res.statusCode).toBe(200);
    expect(res.body.user.name).toBe('Updated Name');
  });

  test('Delete user', async () => {
    const res = await request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});
