const express = require('express');
const { getVolunteersForEvent } = require('../controllers/volcardsController');

const verifyToken = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/adminMiddleware');

const router = express.Router();

// Route to fetch volunteers for a specific event
router.get('/:eventId', verifyToken, verifyAdmin, getVolunteersForEvent);

module.exports = router;


// // volunteerRoutes.js
// import express from 'express';
// import { getVolunteers, addVolunteer, updateVolunteer, deleteVolunteer } from '../controllers/volunteerController.js';

// const router = express.Router();

// // Route to get all volunteers
// router.get('/', getVolunteers);

// // Route to add a new volunteer
// router.post('/', addVolunteer);

// // Route to update a volunteer by ID
// router.put('/:id', updateVolunteer);

// // Route to delete a volunteer by ID
// router.delete('/:id', deleteVolunteer);

// export default router;


  
