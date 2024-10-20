// volunteerController.js
import Volunteer from '../models/volunteerModel.js';

// Get all volunteers
export const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find(); // Fetch volunteers from MongoDB
    res.status(200).json(volunteers); // Send back the volunteers as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching volunteer data' });
  }
};

// Add a new volunteer
export const addVolunteer = async (req, res) => {
  const { name, skills, preferences } = req.body;
  
  try {
    const newVolunteer = new Volunteer({ name, skills, preferences });
    await newVolunteer.save(); // Save the new volunteer to MongoDB
    res.status(201).json(newVolunteer); // Return the created volunteer
  } catch (error) {
    res.status(500).json({ message: 'Error adding volunteer' });
  }
};

// Update a volunteer by ID
export const updateVolunteer = async (req, res) => {
  const { id } = req.params;
  const { name, skills, preferences } = req.body;

  try {
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      id,
      { name, skills, preferences },
      { new: true }
    );
    if (!updatedVolunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.status(200).json(updatedVolunteer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating volunteer' });
  }
};

// Delete a volunteer by ID
export const deleteVolunteer = async (req, res) => {
  const { id } = req.params;

  try {
    const volunteer = await Volunteer.findByIdAndDelete(id);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.status(200).json({ message: 'Volunteer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting volunteer' });
  }
};
