const express = require('express');
const { getVolunteers, addVolunteer, updateVolunteer, deleteVolunteer } = require('../controllers/volunteerController');

const router = express.Router();

// Route to get all volunteers
router.get('/', getVolunteers);

// Route to add a new volunteer
router.post('/', addVolunteer);

// Route to update a volunteer by ID
router.put('/:id', updateVolunteer);

// Route to delete a volunteer by ID
router.delete('/:id', deleteVolunteer);

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


  
