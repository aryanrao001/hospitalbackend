import express from 'express';
import Medicine from '../models/Medicine.js';

const router = express.Router();

// ✅ Add single or multiple medicines
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

// ✅ Get medicines (all or by disease)
router.get('/', async (req, res) => {
  try {
    const { disease } = req.query;

    if (disease) {
      const medicines = await Medicine.find({
        disease: { $regex: new RegExp(disease, 'i') },
      });

      if (medicines.length === 0) {
        return res.status(404).json({ message: 'No medicines found for this disease.' });
      }

      return res.status(200).json(medicines);
    }

    const allMedicines = await Medicine.find().sort({ createdAt: -1 });
    res.status(200).json(allMedicines);
  } catch (err) {
    console.error('Medicine Fetch Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete medicine by ID
router.delete('/:id', async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update medicine by ID (THIS IS WHAT YOU NEED FOR SAVE)
router.put('/:id', async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedMedicine);
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ message: err.message });
  }
});

export default router;



