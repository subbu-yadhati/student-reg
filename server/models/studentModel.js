import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  degree: { type: String, required: true },
  city: { type: String, required: true }
});

export default mongoose.model('Student', studentSchema);