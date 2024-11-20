// src/controllers/skillController.js
const Skill = require('../models/skillModel');

// Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching skills' });
  }
};

// Create a new skill
exports.createSkill = async (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Skill name is required' });
  }

  try {
    // Check if skill already exists
    const existingSkill = await Skill.findOne({ name });
    if (existingSkill) {
      return res.status(400).json({ error: 'Skill already exists' });
    }

    const newSkill = new Skill({ name });
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ error: 'Error creating skill' });
  }
};