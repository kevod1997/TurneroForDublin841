import mongoose from "mongoose";

 export const turnSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  day: { type: Date, required: true },
  hour: { type: String, required: true },
  corte: {type: String, enum: ['pelo', 'barba', 'ambos'], required: true}
});

export default mongoose.model("Turno", turnSchema);
