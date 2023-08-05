import mongoose from "mongoose";

 export const turnSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  hour: { type: String, required: true },
  corte: {type: String, enum: ['Corte', 'Barba', 'Corte y Barba'], required: true}
}, {
  timestamps: true,
});

export default mongoose.model("Turno", turnSchema);
