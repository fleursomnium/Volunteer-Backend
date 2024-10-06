import express from 'express';
import cors from 'cors';

// Set up your express app
const app = express();

app.use(cors());
app.use(express.json());  // To parse JSON data

/////////// This is for the volunteer history page, hard coded for now
app.get('/api/events', async (req, res) => {
    const events = [
        {
            id: 1,
            name: 'Event 1',
            description: 'Description of event 1',
            location: 'Location 1',
            date: '2024-09-11',
            urgency: 'high',
            skills: 'Leadership, Communication',
            status: 'yes',
        },
        {
            id: 2,
            name: 'Event 2',
            description: 'Description of event 2',
            location: 'Location 2',
            date: '2024-10-15',
            urgency: 'low',
            skills: 'Teamwork, Organization',
            status: 'no',
        },
    ];
    res.json(events);
});
//////////////^^^^^^^^^^^^^

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
