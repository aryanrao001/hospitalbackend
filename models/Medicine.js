import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  medicineType: { type: String, required: true },
  disease: { type: String, required: true },
  dose: {
    morning: {
      bf: { type: Boolean, default: false },
      af: { type: Boolean, default: false }
    },
    lunch: {

      bf: { type: Boolean, default: false },
      af: { type: Boolean, default: false }
    },
    evening: {
      bf: { type: Boolean, default: false },
      af: { type: Boolean, default: false }
    },
    night: {
      bf: { type: Boolean, default: false },
      af: { type: Boolean, default: false }
    }
  },
  days: { type: String, default: '1' },

 
}, { timestamps: true });

export default mongoose.model('Medicine', medicineSchema);



