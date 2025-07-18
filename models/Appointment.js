import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: { type: String, required: true },
  doctor: { type: String, required: true },
  department: { type: String, required: true },
  date: { type: String, required: true },
  problem: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);


