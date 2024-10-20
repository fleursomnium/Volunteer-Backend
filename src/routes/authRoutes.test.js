const request = require('supertest');
const express = require('express');
const authRoutes = require('./authRoutes');
const authController = require('../controllers/authController');

jest.mock('../controllers/authController');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Routes', () => {
  it('should call register on POST /auth/register', async () => {
    authController.register.mockImplementation((req, res) => res.status(201).json({ message: 'Registered' }));

    const response = await request(app)
      .post('/auth/register')
      .send({ email: 'test@example.com', password: 'password123', role: 'user' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Registered');
  });

  it('should call login on POST /auth/login', async () => {
    authController.login.mockImplementation((req, res) => res.status(200).json({ message: 'Logged in' }));

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged in');
  });
});
