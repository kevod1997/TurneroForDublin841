import CancelledHours from "../models/hours.model.js";
import UnavailableDays from "../models/days.model.js";

export const deleteExpiredItems = async () => {
    try {
      // Obtiene la fecha y hora actual
      const currentDateTime = new Date();
  
      // Busca y elimina turnos cuya fecha ha pasado
    //   const expiredTurns = await Turno.find({ endDate: { $lt: currentDateTime } });
    //   await Turno.deleteMany({ endDate: { $lt: currentDateTime } });
  
      // Busca y elimina días cancelados cuya fecha ha pasado
      const expiredCancelledDays = await UnavailableDays.find({ date: { $lt: currentDateTime } });
      await UnavailableDays.deleteMany({ date: { $lt: currentDateTime } });
  
      // Busca y elimina horas canceladas cuya fecha ha pasado
      const expiredCancelledHours = await CancelledHours.find({
        endHour: { $lt: currentDateTime },
      });
      await CancelledHours.deleteMany({ endHour: { $lt: currentDateTime } });
  
      console.log(
        `Se eliminaron ${expiredCancelledDays.length} días cancelados y ${expiredCancelledHours.length} horas canceladas vencidas.`
      );
    } catch (error) {
      console.error("Error al eliminar los elementos vencidos:", error.message);
    }
  };
  