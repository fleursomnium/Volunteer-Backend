import express from 'express';
import cors from 'cors';

// Import the routes
import volunteerHistoryRoutes from './routes/routes/volunteerHistory.js';

const app = express();

app.use(cors());
app.use(express.json());  // To parse JSON data

// Use the routes
app.use('/api/volunteer-history', volunteerHistoryRoutes);

// Placeholder routes for other pages
app.get('/', (req, res) => res.json({ message: 'Welcome to the Home page!' }));
app.get('/api/login', (req, res) => res.json({ message: 'Login page route' }));
app.get('/api/register', (req, res) => res.json({ message: 'Register page route' }));
app.get('/api/admin-dashboard', (req, res) => res.json({ message: 'Admin Dashboard page route' }));
app.get('/api/volunteer-dashboard', (req, res) => res.json({ message: 'Volunteer Dashboard page route' }));
app.get('/api/volcards', (req, res) => res.json({ message: 'Volunteer Matching Form page route' }));
app.get('/api/volunteermanagmentform', (req, res) => res.json({ message: 'Volunteer Management Form page route' }));
app.get('/api/eventmanagmentform', (req, res) => res.json({ message: 'Event Management Form page route' }));
app.get('/api/notifs', (req, res) => res.json({ message: 'Notifications page route' }));

// Set up the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 

