const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Comments API Tests', () => {
  let token;
  let projectId; // Assume project exists or create one before tests

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/testdb');
    // Register user and get token
    const userRes = await request(app)
      .post('/users')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });
    token = userRes.body.token;

    // Create project to associate comment with
    const projectRes = await request(app)
      .post('/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Project', description: 'desc' });
    projectId = projectRes.body.project._id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Create comment', async () => {
    const res = await request(app)
      .post('/comments')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'Test comment', project: projectId });
    expect(res.statusCode).toBe(200);
    expect(res.body.comment.text).toBe('Test comment');
  });

  test('Get comments', async () => {
    const res = await request(app)
      .get('/comments')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.comments)).toBe(true);
  });
});
