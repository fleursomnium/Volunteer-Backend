const authController = require('./authController');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Profile = require('../models/profileModel');

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../models/userModel');
jest.mock('../models/profileModel');

describe('Auth Controller', () => {

    describe('Register', () => {

        it('should register a new user', async () => {
            const req = { body: { email: 'test@example.com', password: 'password123', role: 'user' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Mocking User.findOne to return null (no existing user)
            User.findOne.mockResolvedValue(null);

            // Mocking bcrypt.hash to return a hashed password
            bcrypt.hash.mockResolvedValue('hashedPassword123');

            // Mocking User.prototype.save to return the correct user object with id, email, and role
            User.prototype.save = jest.fn().mockResolvedValue({
                _id: 'userId123',
                email: 'test@example.com',
                role: 'user',
            });

            // Mocking Profile.prototype.save
            Profile.prototype.save = jest.fn().mockResolvedValue({});

            // Mocking jwt.sign to return a fake token
            jwt.sign.mockReturnValue('fakeToken');

            // Call the register controller
            await authController.register(req, res);

            // Check that User.findOne is called with the correct email
            expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });

            // Check that bcrypt.hash is called with the correct password and salt
            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);

            // Check that res.status(201) is called
            expect(res.status).toHaveBeenCalledWith(201);

            // Check that res.json is called with the correct token and user data
            expect(res.json).toHaveBeenCalledWith({
                token: 'fakeToken',
                user: { id: 'userId123', email: 'test@example.com', role: 'user' },
            });
        });

        it('should return 400 if user already exists', async () => {
            const req = { body: { email: 'existing@example.com', password: 'password123', role: 'user' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Mocking User.findOne to return an existing user
            User.findOne.mockResolvedValue({ email: 'existing@example.com' });

            // Call the register controller
            await authController.register(req, res);

            // Check that res.status(400) is called
            expect(res.status).toHaveBeenCalledWith(400);

            // Check that res.json is called with the correct message
            expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
        });
    });

    describe('Login', () => {

        it('should log in a user', async () => {
            const req = { body: { email: 'test@example.com', password: 'password123' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Mocking User.findOne to return a user with the hashed password
            const mockUser = {
                _id: 'userId123',
                email: 'test@example.com',
                password: 'hashedPassword123',
                toObject: jest.fn().mockReturnValue({
                    _id: 'userId123',
                    email: 'test@example.com',
                    role: 'user',
                }),
            };

            User.findOne.mockResolvedValue(mockUser);

            // Mocking bcrypt.compare to return true (password matches)
            bcrypt.compare.mockResolvedValue(true);

            // Mocking jwt.sign to return a fake token
            jwt.sign.mockReturnValue('fakeToken');

            // Call the login controller
            await authController.login(req, res);

            // Check that User.findOne is called with the correct email
            expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });

            // Check that bcrypt.compare is called with the correct passwords
            expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');

            // Check that res.json is called with the correct token and user data
            expect(res.json).toHaveBeenCalledWith({
                token: 'fakeToken',
                user: { _id: 'userId123', email: 'test@example.com', role: 'user' },
            });
        });

        it('should return 400 if email is not found', async () => {
            const req = { body: { email: 'nonexistent@example.com', password: 'password123' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Mocking User.findOne to return null (user not found)
            User.findOne.mockResolvedValue(null);

            // Call the login controller
            await authController.login(req, res);

            // Check that res.status(400) is called
            expect(res.status).toHaveBeenCalledWith(400);

            // Check that res.json is called with the correct message
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
        });
    });
});