import express from 'express';
import Patient from '../models/Patient.js';

const router = express.Router();

// ✅ Add patient
router.post('/add', async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      gender,
      status,
      picture,
      weight,
      bp,
      temperature,
      spo2,
      bloodSugar
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const newPatient = new Patient({
      name,
      phone,
      address,
      gender,
      status,
      picture,
      weight,
      bp,
      temperature,
      spo2,
      bloodSugar,
      medicineList: [],
      testList: []
    });

    await newPatient.save();
    res.status(201).json({ message: 'Patient added successfully', patient: newPatient });
  } catch (err) {
    console.error('❌ Error adding patient:', err);
    res.status(500).json({ error: 'Failed to add patient' });
  }
});

// ✅ Count patients
router.get('/count', async (req, res) => {
  try {
    const count = await Patient.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    console.error('❌ Error counting patients:', err);
    res.status(500).json({ error: 'Failed to count patients' });
  }
});

// ✅ Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.status(200).json(patients);
  } catch (err) {
    console.error('❌ Error fetching patients:', err);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// ✅ Get single patient by ID
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    console.error('❌ Error fetching patient by ID:', err);
    res.status(500).json({ error: 'Failed to fetch patient' });
  }
});

// ✅ Delete patient
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ error: 'Failed to delete patient' });
  }
});

// ✅ Update patient
router.put('/:id', async (req, res) => {
  console.log('🛠️ PUT request body:', req.body);

  try {
    const {
      name,
      phone,
      gender,
      status,
      address,
      picture,
      weight,
      bp,
      temperature,
      spo2,
      bloodSugar,
      medicineList = [],
      testList = []
    } = req.body;

    const updated = await Patient.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          phone,
          gender,
          status,
          address,
          picture,
          weight,
          bp,
          temperature,
          spo2,
          bloodSugar,
          medicineList,
          testList
        }
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    console.log('✅ Patient updated successfully:', updated);
    res.status(200).json(updated);
  } catch (err) {
    console.error('❌ Update error:', err);
    res.status(500).json({ error: 'Failed to update patient' });
  }
});

export default router;

















