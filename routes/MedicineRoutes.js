import express from 'express';
import Medicine from '../models/Medicine.js';

const router = express.Router();

/**
 * ➕ Add New Medicines
 * Supports single or multiple medicines (via array)
 * Each medicine should contain: disease, medicineName, medicineType, dose, days, tests (optional)
 */
router.post('/add', async (req, res) => {
  try {
    const data = req.body;

    const created = Array.isArray(data)
      ? await Medicine.insertMany(data)
      : await Medicine.create(data);

    res.status(201).json({ success: true, medicine: created });
  } catch (err) {
    console.error('Add Medicine Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * 🔍 GET All Medicines or Filter by Disease
 * /api/medicines?disease=fever
 */
router.get('/', async (req, res) => {
  try {
    const { disease } = req.query;

    if (disease) {
      const medicines = await Medicine.find({
        disease: { $regex: new RegExp(disease, 'i') }, // Case-insensitive match
      });

      if (medicines.length === 0) {
        return res.status(404).json({ message: 'No medicines found for this disease.' });
      }

      return res.status(200).json(medicines);
    }

    // Return all medicines sorted by latest
    const allMedicines = await Medicine.find().sort({ createdAt: -1 });
    res.status(200).json(allMedicines);
  } catch (err) {
    console.error('Medicine Fetch Error:', err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * 🗑️ DELETE a Medicine by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ message: err.message });
  }
});
// routes/patientRoutes.js
router.put('/:id', async (req, res) => {
  try {
    const { medicineList, testList } = req.body;

    const updated = await Patient.findByIdAndUpdate(
      req.params.id,
      { medicineList, testList },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: err.message });
  }
});


export default router;


