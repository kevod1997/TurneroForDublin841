import mongoose from "mongoose";

const daySchema = new mongoose.Schema({
  date: { type: Date, required: true }, // Fecha del día
  enabled: { type: Boolean, default: true }, // Indica si el día está habilitado o no
});

export default mongoose.model("Day", daySchema);
