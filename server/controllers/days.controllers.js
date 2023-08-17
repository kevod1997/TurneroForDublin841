import es from "date-fns/locale/es/index.js";
import UnavailableDays from "../models/days.model.js";
import { addDays, format, getDay, parseISO, toDate } from "date-fns";
import { isDateInPast } from "../utils/date.js";

export const getCancelledWorkingDays = async (req, res) => {
  try {
    const cancelledDays = await UnavailableDays.find({ enabled: false });
    if (cancelledDays.length === 0) {
      return res.status(404).json({ message: "No hay dias cancelados" });
    }
    return res.json(cancelledDays);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const cancelWorkingDays = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    console.log(startDate, endDate);

    // Convertir las fechas de inicio y fin en objetos Date
    const parsedStartDate = parseISO(startDate);
    const parsedEndDate = parseISO(endDate);

    if (isDateInPast(parsedStartDate)) {
      return res.status(400).json({
        message: "No es posible cancelar un dia de una fecha que ya ha pasado.",
      });
    }

    // Iterar sobre los días del intervalo y realizar la cancelación para cada día
    const cancelledDays = [];

    for (
      let currentDay = parsedStartDate;
      currentDay <= parsedEndDate;
      currentDay = addDays(currentDay, 1)
    ) {
      // Verificar si el día es domingo (0) o lunes (1), si es así, saltar al siguiente día
      if (getDay(currentDay) === 0 || getDay(currentDay) === 1) {
        continue;
      }
      const formattedDay = toDate(currentDay, "dd-MM-yyyy");
      console.log('formated '+ formattedDay);

      // Buscar si el dia ya esta cancelado
      const dayExist = await UnavailableDays.findOne({ date: formattedDay });
      if (dayExist) {
        console.log('dayexist'+ dayExist);
        return res.json({ message: `El dia ` });
      } else {
        // Si el día no existe, crearlo y deshabilitarlo (enabled = false)
        const newDay = new UnavailableDays({
          date: currentDay,
          enabled: false,
        });
        cancelledDays.push(currentDay);
        await newDay.save();
      }
    }

    if (cancelledDays.length === 1) {
      return res.json({
        message: `El día ${format(cancelledDays[0], "eeee d 'de' MMMM", {
          locale: es,
        })} fue cancelado exitosamente.`,
      });
    }
    return res.json({
      message: `Los días ${cancelledDays
        .map((date) => format(date, "eeee d 'de' MMMM", { locale: es }))
        .join(", ")} fueron cancelados exitosamente.`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCancelledDays = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Convertir las fechas de inicio y fin en objetos Date
    const parsedStartDate = parseISO(startDate);
    const parsedEndDate = parseISO(endDate);

    // Buscar los días que ya están cancelados dentro del rango de fechas
    const existingDays = await UnavailableDays.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    // Eliminar los días existentes en la colección
    await UnavailableDays.deleteMany({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    const cancelledDays = existingDays.map((day) => day.date);

    if (cancelledDays.length === 1) {
      return res.json({
        message: `El día ${format(cancelledDays[0], "eeee d 'de' MMMM", {
          locale: es,
        })} esta nuevamente disponible.`,
      });
    }

    return res.json({
      message: `Los días ${cancelledDays
        .map((date) => format(date, "eeee d 'de' MMMM", { locale: es }))
        .join(", ")} estan nuevamente disponibles.`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCancelledDayById = async (req, res) => {
  try {
    const id = req.params.id;
    const turno = await UnavailableDays.findById(id);

    if (!turno) {
      return res
        .status(404)
        .json({ message: "No se encontró el turno con el ID proporcionado." });
    }

    // Guardar el día del turno parseado antes de eliminarlo
    const deletedDate = turno.date;
    console.log(deletedDate);

    // Eliminar el turno de la base de datos
    await UnavailableDays.findByIdAndDelete(id);

    return res.json({
      message: `El turno del día ${format(deletedDate, "eeee d 'de' MMMM", {
        locale: es,
      })} fue eliminado exitosamente.`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
