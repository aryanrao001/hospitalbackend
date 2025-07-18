// backend/routes/appointmentRoutes.js
import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// ✅ POST: Add appointment
router.post('/add', async (req, res) => {
  const { patient, doctor, department, date, problem, status } = req.body;

  if (!patient || !doctor || !department || !date || !status) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  try {
    const newAppointment = new Appointment({
      patient,
      doctor,
      department,
      date,
      problem,
      status,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment added successfully' });
  } catch (err) {
    console.error('Error saving appointment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ GET: All appointments
router.get('/count', async (req, res) => {
  try {
    const count = await Appointment.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    console.error('❌ Error counting appointments:', err);
    res.status(500).json({ error: 'Failed to count appointments' });
  }
});


router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// ✅ PUT: Update appointment
router.put('/:id', async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Appointment not found' });
    res.status(200).json({ message: 'Appointment updated successfully' });
  } catch (err) {
    console.error('Error updating appointment:', err);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// ✅ DELETE: Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Appointment not found' });
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

export default router;




