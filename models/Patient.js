// models/Patient.js
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: String,
  phone: String,
  gender: String,
  address: String,

  medicineList: [
    {
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
      days: { type: String, default: '1' }
    }
  ],

  testList: [
    {
      testName: { type: String, required: true },
      required: { type: Boolean, default: true }
    }
  ]
});

export default mongoose.model('Patient', patientSchema);

















