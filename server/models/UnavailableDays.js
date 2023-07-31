import mongoose from "mongoose";

const daySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  enabled: { type: Boolean, default: true }, 
});

export default mongoose.model("UnavailableDays", daySchema);
