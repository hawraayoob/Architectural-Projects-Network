const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Projects API Tests', () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/testdb');
    // Login or register user to get token
    const userRes = await request(app)
      .post('/users')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });
    token = userRes.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Create a new project', async () => {
    const res = await request(app)
      .post('/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'New Project', description: 'Project description' });
    expect(res.statusCode).toBe(200);
    expect(res.body.project.title).toBe('New Project');
  });

  test('Get projects list', async () => {
    const res = await request(app)
      .get('/projects')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.projects)).toBe(true);
  });
});
