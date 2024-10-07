import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Required to use __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());  // To parse JSON data

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Import the routes
// Gaby
import volunteerHistoryRoutes from './routes/routes/volunteerHistory.js';
// Mel
import LoginRoute from './routes/routes/Login.js';
import RegisterRoute from './routes/routes/Register.js';
import VolunteerDashboardRoute from './routes/routes/VolunteerDashboard.js';
// Syeda
// Angie

// Use the routes
// Gaby
app.use('/api/volunteer-history', volunteerHistoryRoutes);
// Mel
app.use('/api/login', LoginRoute);
app.use('/api/register', RegisterRoute);
app.use('/api/volunteer-dashboard', VolunteerDashboardRoute);
// Syeda
// Angie

// Placeholder routes for other pages
app.get('/', (req, res) => res.json({ message: 'Welcome to the Home page!' }));
// Gaby
app.get('/api/admin-dashboard', (req, res) => res.json({ message: 'Admin Dashboard page route' }));
// Mel
// app.get('/api/login', (req, res) => res.json({ message: 'Login page route' }));
// app.get('/api/register', (req, res) => res.json({ message: 'Register page route' }));
// app.get('/api/volunteer-dashboard', (req, res) => res.json({ message: 'Volunteer Dashboard page route' }));
// Syeda
app.get('/api/volunteermanagmentform', (req, res) => res.json({ message: 'Volunteer Management Form page route' }));
app.get('/api/eventmanagmentform', (req, res) => res.json({ message: 'Event Management Form page route' }));
// Angie
app.get('/api/volcards', (req, res) => res.json({ message: 'Volunteer Matching Form page route' }));
app.get('/api/notifs', (req, res) => res.json({ message: 'Notifications page route' }));

// Set up the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
