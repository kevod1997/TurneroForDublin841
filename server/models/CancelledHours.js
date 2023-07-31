import mongoose from 'mongoose';

const cancelledHourSchema = new mongoose.Schema({
  date: { type: Date, required: true }, 
  startHour: { type: String, required: true },
  endHour: { type: String, required: true }, 
});

export default mongoose.model('CancelledHours', cancelledHourSchema);
