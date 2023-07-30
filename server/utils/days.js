import Day from "../models/Day.js";



// Buscar el documento del día en la base de datos
export const unavailableDays = await Day.findOne({
  name: parsedDay
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase(),
});
if (!unavailableDays || !unavailableDays.enabled) {
  return res.status(400).json({
    error: `No trabajamos el día ${parsedDay.toLocaleDateString("es-ES", {
      weekday: "long",
    })}. Por favor, seleccione un día hábil.`,
  });
}
