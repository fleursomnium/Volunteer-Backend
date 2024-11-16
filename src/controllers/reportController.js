// src/controllers/reportController.js
const VolunteerProfile = require('../models/volunteerProfileModel');
const Event = require('../models/eventModel');

const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');

const getVolunteersReport = async (req, res) => {
  try {
    const volunteers = await VolunteerProfile.find()
      .populate('userId', 'email')
      .populate('confirmedEvents', 'name date')
      .populate('history', 'name date');

    res.status(200).json(volunteers);
  } catch (error) {
    console.error('Error fetching volunteers report:', error);
    res.status(500).json({ msg: 'Failed to fetch volunteers report' });
  }
};

const getEventsReport = async (req, res) => {
    try {
      const events = await Event.find()
        .populate('registeredVolunteers', 'firstName lastName userId')
        .populate({
          path: 'registeredVolunteers',
          populate: {
            path: 'userId',
            select: 'email',
          },
        });
  
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events report:', error);
      res.status(500).json({ msg: 'Failed to fetch events report' });
    }
  };

  const generateVolunteersCSV = async (req, res) => {
    try {
      const volunteers = await VolunteerProfile.find()
        .populate('userId', 'email')
        .populate('confirmedEvents', 'name date')
        .populate('history', 'name date');
  
      // Prepare data for CSV
      const data = volunteers.map((volunteer) => ({
        firstName: volunteer.firstName,
        lastName: volunteer.lastName,
        email: volunteer.userId.email,
        confirmedEvents: volunteer.confirmedEvents.map((event) => event.name).join('; '),
        history: volunteer.history.map((event) => event.name).join('; '),
      }));
  
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(data);
  
      res.header('Content-Type', 'text/csv');
      res.attachment('volunteers_report.csv');
      return res.send(csv);
    } catch (error) {
      console.error('Error generating volunteers CSV report:', error);
      res.status(500).json({ msg: 'Failed to generate CSV report' });
    }
  };

  const generateVolunteersPDF = async (req, res) => {
    try {
      const volunteers = await VolunteerProfile.find()
        .populate('userId', 'email')
        .populate('confirmedEvents', 'name date')
        .populate('history', 'name date');
  
      const doc = new PDFDocument();
      let filename = 'volunteers_report';
      // Remove special characters from filename
      filename = encodeURIComponent(filename) + '.pdf';
      // Set response headers
      res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
      res.setHeader('Content-type', 'application/pdf');
  
      doc.pipe(res);
  
      doc.fontSize(20).text('Volunteers Report', { align: 'center' });
      doc.moveDown();
  
      volunteers.forEach((volunteer) => {
        doc.fontSize(14).text(`Name: ${volunteer.firstName} ${volunteer.lastName}`);
        doc.text(`Email: ${volunteer.userId.email}`);
        doc.text(`Confirmed Events: ${volunteer.confirmedEvents.map((event) => event.name).join(', ')}`);
        doc.text(`Participation History: ${volunteer.history.map((event) => event.name).join(', ')}`);
        doc.moveDown();
      });
  
      doc.end();
    } catch (error) {
      console.error('Error generating volunteers PDF report:', error);
      res.status(500).json({ msg: 'Failed to generate PDF report' });
    }
  };

  const generateEventsCSV = async (req, res) => {
    try {
      const events = await Event.find()
        .populate('registeredVolunteers', 'firstName lastName userId')
        .populate({
          path: 'registeredVolunteers',
          populate: {
            path: 'userId',
            select: 'email',
          },
        });
  
      // Prepare data for CSV
      const data = events.map((event) => ({
        name: event.name,
        date: event.date.toISOString().split('T')[0],
        volunteers: event.registeredVolunteers
          .map((volunteer) => `${volunteer.firstName} ${volunteer.lastName}`)
          .join('; '),
      }));
  
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(data);
  
      res.header('Content-Type', 'text/csv');
      res.attachment('events_report.csv');
      return res.send(csv);
    } catch (error) {
      console.error('Error generating events CSV report:', error);
      res.status(500).json({ msg: 'Failed to generate CSV report' });
    }
  };

  const generateEventsPDF = async (req, res) => {
    try {
      const events = await Event.find()
        .populate('registeredVolunteers', 'firstName lastName userId')
        .populate({
          path: 'registeredVolunteers',
          populate: {
            path: 'userId',
            select: 'email',
          },
        });
  
      const doc = new PDFDocument();
      let filename = 'events_report';
      filename = encodeURIComponent(filename) + '.pdf';
      res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
      res.setHeader('Content-type', 'application/pdf');
  
      doc.pipe(res);
  
      doc.fontSize(20).text('Events Report', { align: 'center' });
      doc.moveDown();
  
      events.forEach((event) => {
        doc.fontSize(14).text(`Event Name: ${event.name}`);
        doc.text(`Date: ${event.date.toISOString().split('T')[0]}`);
        doc.text(
          `Volunteers: ${event.registeredVolunteers
            .map((volunteer) => `${volunteer.firstName} ${volunteer.lastName}`)
            .join(', ')}`
        );
        doc.moveDown();
      });
  
      doc.end();
    } catch (error) {
      console.error('Error generating events PDF report:', error);
      res.status(500).json({ msg: 'Failed to generate PDF report' });
    }
  };

module.exports = { getVolunteersReport, getEventsReport, 
                   generateVolunteersCSV, generateVolunteersPDF, 
                   generateEventsCSV, generateEventsPDF };