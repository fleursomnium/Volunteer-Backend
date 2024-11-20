// src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const { getVolunteersReport, getEventsReport, generateVolunteersCSV, 
    generateVolunteersPDF, generateEventsCSV, generateEventsPDF } = require('../controllers/reportController');
const verifyToken = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/adminMiddleware');

router.get('/volunteers', verifyToken, verifyAdmin, getVolunteersReport);
router.get('/events', verifyToken, verifyAdmin, getEventsReport);
router.get('/volunteers/csv', verifyToken, verifyAdmin, generateVolunteersCSV);
router.get('/volunteers/pdf', verifyToken, verifyAdmin, generateVolunteersPDF);
router.get('/events/csv', verifyToken, verifyAdmin, generateEventsCSV);
router.get('/events/pdf', verifyToken, verifyAdmin, generateEventsPDF);
module.exports = router;