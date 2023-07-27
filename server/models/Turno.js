import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  day: { type: Date, required: true },
  hour: { type: String, required: true },
  corte: ["pelo"|"barba"|"ambos"],
});

export default mongoose.model("Turno", postSchema);
