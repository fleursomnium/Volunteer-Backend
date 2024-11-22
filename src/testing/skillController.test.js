const request = require('supertest');
const app = require('../../server'); // Path to your server.js
const mongoose = require('mongoose');
const Skill = require('../models/skillModel'); // Skill model path

describe('Skill Controller Tests', () => {
    // Connect to the database before all tests
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    // Clean up the database after each test
    afterEach(async () => {
        await Skill.deleteMany();
    });

    // Disconnect from the database after all tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Tests for GET /api/skills
    describe('GET /api/skills', () => {
        it('should fetch all skills', async () => {
            // Seed the database with test data
            await Skill.create([{ name: 'JavaScript' }, { name: 'Node.js' }]);

            const response = await request(app).get('/api/skills');
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2); // Check total number of skills returned
            expect(response.body[0].name).toBe('JavaScript');
            expect(response.body[1].name).toBe('Node.js');
        });

        it('should handle errors during fetching', async () => {
            // Mock the Skill.find method to throw an error
            jest.spyOn(Skill, 'find').mockImplementationOnce(() => {
                throw new Error('Database error');
            });

            const response = await request(app).get('/api/skills');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                message: 'Failed to fetch skills',
                error: 'Database error',
            });

            // Restore the original implementation
            Skill.find.mockRestore();
        });
    });

    // Tests for POST /api/skills
    describe('POST /api/skills', () => {
        it('should create a new skill', async () => {
            const response = await request(app)
                .post('/api/skills')
                .send({ name: 'React' });

            expect(response.status).toBe(201);
            expect(response.body.name).toBe('React');

            // Verify the skill exists in the database
            const skill = await Skill.findOne({ name: 'React' });
            expect(skill).not.toBeNull();
        });

        it('should return 400 if skill name is missing', async () => {
            const response = await request(app).post('/api/skills').send({});
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Skill name is required' });
        });

        it('should return 400 if skill already exists', async () => {
            await Skill.create({ name: 'Express' });

            const response = await request(app)
                .post('/api/skills')
                .send({ name: 'Express' });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Skill already exists' });
        });

        it('should handle errors during skill creation (cover line 33)', async () => {
            // Mock Skill.create to throw an error
            jest.spyOn(Skill, 'create').mockImplementationOnce(() => {
                throw new Error('Database error');
            });

            // Send a valid skill creation request
            const response = await request(app).post('/api/skills').send({ name: 'React' });

            // Assert the response
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error creating skill' });

            // Restore the mock
            Skill.create.mockRestore();
        });
    });
});





// const request = require('supertest');
// const app = require('../../server'); // Path to your server.js
// const mongoose = require('mongoose');
// const Skill = require('../models/skillModel'); // Skill model path

// describe('Skill Controller Tests', () => {
//     beforeAll(async () => {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//     });

//     beforeEach(async () => {
//         await Skill.deleteMany();
//     });

//     afterEach(() => {
//         jest.restoreAllMocks();
//     });

//     afterAll(async () => {
//         await mongoose.connection.close();
//     });

//     describe('GET /api/skills', () => {
//         it('should fetch all skills', async () => {
//             await Skill.create([{ name: 'JavaScript' }, { name: 'Node.js' }]);

//             const response = await request(app).get('/api/skills');
//             expect(response.status).toBe(200);
//             expect(response.body).toHaveLength(2);
//             expect(response.body[0].name).toBe('JavaScript');
//             expect(response.body[1].name).toBe('Node.js');
//         });

//         it('should handle errors during fetching', async () => {
//             jest.spyOn(Skill, 'find').mockImplementationOnce(() => {
//                 throw new Error('Database error');
//             });

//             const response = await request(app).get('/api/skills');
//             expect(response.status).toBe(500);
//             expect(response.body).toEqual({
//                 message: 'Error fetching skills',
//                 error: 'Database error',
//             });
//         });
//     });

//     describe('POST /api/skills', () => {
//         it('should create a new skill', async () => {
//             const response = await request(app).post('/api/skills').send({ name: 'React' });
//             expect(response.status).toBe(201);
//             expect(response.body.name).toBe('React');

//             const skill = await Skill.findOne({ name: 'React' });
//             expect(skill).not.toBeNull();
//         });

//         it('should handle errors during skill creation', async () => {
//             jest.spyOn(Skill, 'create').mockImplementationOnce(() => {
//                 throw new Error('Database error');
//             });

//             const response = await request(app).post('/api/skills').send({ name: 'React' });
//             expect(response.status).toBe(500);
//             expect(response.body).toEqual({
//                 message: 'Failed to create skill',
//                 error: 'Database error',
//             });
//         });

//         it('should return 400 if skill name is missing', async () => {
//             const response = await request(app).post('/api/skills').send({});
//             expect(response.status).toBe(400);
//             expect(response.body).toEqual({ error: 'Skill name is required' });
//         });

//         it('should return 400 if skill already exists', async () => {
//             await Skill.create({ name: 'Express' });

//             const response = await request(app).post('/api/skills').send({ name: 'Express' });
//             expect(response.status).toBe(400);
//             expect(response.body).toEqual({ error: 'Skill already exists' });
//         });
//     });
// });















// const request = require('supertest');
// const app = require('../../server'); // Path to your server.js
// const mongoose = require('mongoose');
// const Skill = require('../models/skillModel'); // Skill model path

// describe('Skill Controller Tests', () => {
//     // Connect to the database before all tests
//     beforeAll(async () => {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//     });

//     // Clean up the database after each test
//     afterEach(async () => {
//         await Skill.deleteMany();
//     });

//     // Disconnect from the database after all tests
//     afterAll(async () => {
//         await mongoose.connection.close();
//     });

//     describe('GET /api/skills', () => {
//         it('should fetch all skills', async () => {
//             // Seed the database with test data
//             await Skill.create([{ name: 'JavaScript' }, { name: 'Node.js' }]);

//             const response = await request(app).get('/api/skills');
//             expect(response.status).toBe(200);
//             expect(response.body).toHaveLength(2); // Check total number of skills returned
//             expect(response.body[0].name).toBe('JavaScript');
//             expect(response.body[1].name).toBe('Node.js');
//         });

//         it('should handle errors during fetching', async () => {
//             // Mock the Skill.find method to throw an error
//             jest.spyOn(Skill, 'find').mockImplementationOnce(() => {
//                 throw new Error('Database error');
//             });

//             const response = await request(app).get('/api/skills');
//             expect(response.status).toBe(500);
//             expect(response.body).toEqual({
//                 message: 'Failed to fetch skills',
//                 error: 'Database error',
//             });

//             // Restore the original implementation
//             Skill.find.mockRestore();
//         });
//     });

//     describe('POST /api/skills', () => {
//         it('should create a new skill', async () => {
//             const response = await request(app)
//                 .post('/api/skills')
//                 .send({ name: 'React' });

//             expect(response.status).toBe(201);
//             expect(response.body.name).toBe('React');

//             // Verify the skill exists in the database
//             const skill = await Skill.findOne({ name: 'React' });
//             expect(skill).not.toBeNull();
//         });

//         it('should handle errors during skill creation', async () => {
//             // Mock the Skill.create method to throw an error
//             jest.spyOn(Skill, 'create').mockImplementationOnce(() => {
//                 throw new Error('Database error');
//             });

//             const response = await request(app).post('/api/skills').send({ name: 'React' });
//             expect(response.status).toBe(500);
//             expect(response.body).toEqual({
//                 message: 'Failed to create skill',
//                 error: 'Database error',
//             });

//             // Restore the original implementation
//             Skill.create.mockRestore();
//         });

//         it('should return 400 if skill name is missing', async () => {
//             const response = await request(app).post('/api/skills').send({});
//             expect(response.status).toBe(400);
//             expect(response.body).toEqual({ error: 'Skill name is required' });
//         });

//         it('should return 400 if skill already exists', async () => {
//             await Skill.create({ name: 'Express' });

//             const response = await request(app)
//                 .post('/api/skills')
//                 .send({ name: 'Express' });

//             expect(response.status).toBe(400);
//             expect(response.body).toEqual({ error: 'Skill already exists' });
//         });
//     });
// });



//94%
// const request = require('supertest');
// const app = require('../../server');
// const mongoose = require('mongoose');
// const Skill = require('../models/skillModel');

// describe('Skill Controller Tests', () => {
//     beforeAll(async () => {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//     });

//     beforeEach(async () => {
//         await Skill.deleteMany();
//     });

//     afterEach(async () => {
//         await Skill.deleteMany();
//         jest.restoreAllMocks(); // Restore mocked methods
//     });

//     afterAll(async (done) => {
//         await mongoose.connection.close();
//         done();
//     });

//     describe('GET /api/skills', () => {
//         it('should fetch all skills', async () => {
//             await Skill.create([{ name: 'JavaScript' }, { name: 'Node.js' }]);

//             const response = await request(app).get('/api/skills');
//             expect(response.status).toBe(200);
//             expect(response.body).toHaveLength(2);
//             expect(response.body[0].name).toBe('JavaScript');
//             expect(response.body[1].name).toBe('Node.js');
//         });

//         it('should handle errors during fetching', async () => {
//             jest.spyOn(Skill, 'find').mockImplementationOnce(() => {
//                 throw new Error('Database error');
//             });

//             const response = await request(app).get('/api/skills');
//             expect(response.status).toBe(500);
//             expect(response.body).toEqual({
//                 message: 'Error fetching skills',
//                 error: 'Database error',
//             });
//         });
//     });

//     describe('POST /api/skills', () => {
//         it('should create a new skill', async () => {
//             const response = await request(app).post('/api/skills').send({ name: 'React' });

//             expect(response.status).toBe(201);
//             expect(response.body.name).toBe('React');

//             const skill = await Skill.findOne({ name: 'React' });
//             expect(skill).not.toBeNull();
//         });

//         it('should handle errors during skill creation', async () => {
//             jest.spyOn(Skill, 'create').mockImplementationOnce(() => {
//                 throw new Error('Database error');
//             });

//             const response = await request(app).post('/api/skills').send({ name: 'React' });
//             expect(response.status).toBe(500);
//             expect(response.body).toEqual({
//                 message: 'Failed to create skill',
//                 error: 'Database error',
//             });
//         });

//         it('should return 400 if skill name is missing', async () => {
//             const response = await request(app).post('/api/skills').send({});
//             expect(response.status).toBe(400);
//             expect(response.body).toEqual({ error: 'Skill name is required' });
//         });

//         it('should return 400 if skill already exists', async () => {
//             await Skill.create({ name: 'Express' });

//             const response = await request(app).post('/api/skills').send({ name: 'Express' });
//             expect(response.status).toBe(400);
//             expect(response.body).toEqual({ error: 'Skill already exists' });
//         });
//     });
// });








// const request = require('supertest');
// const app = require('../../server'); // Corrected path to server.js
// const mongoose = require('mongoose');
// const Skill = require('../models/skillModel'); // Corrected path to Skill model

// describe('Skill Controller Tests', () => {
//     // Connect to the test database before running any tests
//     beforeAll(async () => {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//     });

//     // Clear the database after each test to ensure a clean slate
//     afterEach(async () => {
//         await Skill.deleteMany();
//     });

//     // Disconnect from the database after all tests have run
//     afterAll(async () => {
//         await mongoose.connection.close();
//     });

//     describe('GET /api/skills', () => {
//         it('should fetch all skills', async () => {
//             // Seed the database with test data
//             await Skill.create([{ name: 'JavaScript' }, { name: 'Node.js' }]);

//             const response = await request(app).get('/api/skills');
//             expect(response.status).toBe(200);
//             expect(response.body).toHaveLength(2);
//             expect(response.body[0].name).toBe('JavaScript');
//             expect(response.body[1].name).toBe('Node.js');
//         });

//         it('should return an empty array if no skills exist', async () => {
//             const response = await request(app).get('/api/skills');
//             expect(response.status).toBe(200);
//             expect(response.body).toEqual([]);
//         });
//     });

//     describe('POST /api/skills', () => {
//         it('should create a new skill', async () => {
//             const response = await request(app)
//                 .post('/api/skills')
//                 .send({ name: 'React' });

//             expect(response.status).toBe(201);
//             expect(response.body.name).toBe('React');

//             // Verify the skill exists in the database
//             const skill = await Skill.findOne({ name: 'React' });
//             expect(skill).not.toBeNull();
//         });

//         it('should return 400 if skill name is missing', async () => {
//             const response = await request(app).post('/api/skills').send({});
//             expect(response.status).toBe(400);
//             expect(response.body.error).toBe('Skill name is required');
//         });

//         it('should return 400 if skill already exists', async () => {
//             await Skill.create({ name: 'Express' });

//             const response = await request(app)
//                 .post('/api/skills')
//                 .send({ name: 'Express' });

//             expect(response.status).toBe(400);
//             expect(response.body.error).toBe('Skill already exists');
//         });
//     });
// });
