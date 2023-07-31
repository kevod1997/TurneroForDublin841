import { parseISO, format, isWithinInterval } from "date-fns";
import es from "date-fns/locale/es/index.js";
import CancelledHours from "../models/CancelledHours.js";
import UnavailableDays from "../models/UnavailableDays.js";

export const cancelHours = async (req, res) => {
  try {
    const { date, startHour, endHour } = req.body;

    // Convertir la fecha en un objeto Date
    const parsedDate = parseISO(date);

    //Verificar que el intervalo de tiempo entre startHour y endHour no este ya cancelado
    const cancelledHours = await CancelledHours.find({ date: parsedDate });
    const cancelledHoursIntervals = cancelledHours.map((cancelledHour) => {
      const { startHour, endHour } = cancelledHour;
      const startTime = parseISO(`2000-01-01T${startHour}`);
      const endTime = parseISO(`2000-01-01T${endHour}`);
      return { startTime, endTime };
    });

    const isIntervalAlreadyCancelled = cancelledHoursIntervals.some(
      (cancelledHourInterval) =>
        isWithinInterval(parseISO(`2000-01-01T${startHour}`), {
          start: cancelledHourInterval.startTime,
          end: cancelledHourInterval.endTime,
        }) ||
        isWithinInterval(parseISO(`2000-01-01T${endHour}`), {
          start: cancelledHourInterval.startTime,
          end: cancelledHourInterval.endTime,
        })
    );
    console.log("isIntervalAlreadyCancelled:", isIntervalAlreadyCancelled);

    if (isIntervalAlreadyCancelled) {
      return res.status(400).json({
        message: `El intervalo de horas desde ${startHour} hasta ${endHour} del día ${format(
          parsedDate,
          "eeee d MMMM",
          { locale: es }
        )} ya está cancelado.`,
      });
    }

    // Verificar si el día está en la colección UnavailableDays
    const isUnavailableDay = await UnavailableDays.exists({ date: parsedDate });
    if (isUnavailableDay) {
      return res.status(400).json({
        message: `No se puede cancelar horas en el dia ${format(
          parsedDate,
          "eeee d MMMM",
          { locale: es }
        )} ya que está deshabilitado.`,
      });
    }

    // Crear el objeto para el intervalo de horas cancelado
    const cancelledInterval = new CancelledHours({
      date: parsedDate,
      startHour,
      endHour,
    });

    // Guardar el intervalo de horas cancelado en la base de datos
    await cancelledInterval.save();

    if (startHour === endHour) {
      return res.json({
        message: `Se canceló la hora ${startHour} del día ${format(
          parsedDate,
          "eeee d MMMM",
          { locale: es }
        )} exitosamente.`,
      });
    } else {
      return res.json({
        message: `Se cancelaron las horas desde ${startHour} hasta ${endHour} del día ${format(
          parsedDate,
          "eeee d MMMM",
          { locale: es }
        )} exitosamente.`,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCancelledHours = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, startHour, endHour } = req.body;

    // Convertir la fecha en un objeto Date
    const parsedDate = parseISO(date);

    // Verificar si el intervalo de horas cancelado existe en la base de datos
    const cancelledHour = await CancelledHours.findById(id);

    if (!cancelledHour) {
      return res.status(404).json({
        message: `El intervalo de horas cancelado con ID ${id} no fue encontrado.`,
      });
    }
    if (
      startHour === cancelledHour.startHour &&
      endHour === cancelledHour.endHour
    ) {
      return res.status(400).json({
        message: "Tienes que modificar el horario para poder actualizarlo.",
      });
    }

    // Actualizar el intervalo de horas cancelado en la base de datos
    const updatedCancelledHour = await CancelledHours.findByIdAndUpdate(
      id,
      {
        date: parsedDate,
        startHour,
        endHour,
      },
      { overwrite: false }
    );

    return res.json({
      message: `El intervalo de horas desde ${cancelledHour.startHour} hasta ${
        cancelledHour.endHour
      } del día ${format(parsedDate, "eeee d MMMM", {
        locale: es,
      })} ha sido modificado. El nuevo horarios es desde ${startHour} hasta ${endHour}.`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCancelledHours = async (req, res) => {
  try {
    const { date, startHour, endHour } = req.body;

    // Convertir la fecha en un objeto Date
    const parsedDate = parseISO(date);

    // Verificar si el intervalo de horas cancelado existe en la base de datos
    const cancelledHours = await CancelledHours.find({
      date: parsedDate,
      startHour: { $gte: startHour },
      endHour: { $lte: endHour },
    });
    console.log("cancelledHours:", cancelledHours);
    if (cancelledHours.length === 0) {
      return res.status(400).json({
        message: `El intervalo de horas desde ${startHour} hasta ${endHour} del día ${format(
          parsedDate,
          "eeee d MMMM",
          { locale: es }
        )} no está cancelado.`,
      });
    }

    // Eliminar el intervalo de horas cancelado en la base de datos
    await CancelledHours.deleteMany({
      date: parsedDate,
      startHour: { $gte: startHour },
      endHour: { $lte: endHour },
    });

    if (startHour === endHour) {
      return res.json({
        message: `El horarios de las ${startHour} horas del día ${format(
          parsedDate,
          "eeee d MMMM",
          { locale: es }
        )} esta nuevamente disponible.`,
      });
    } else {
      return res.json({
        message: `Las horas desde las ${startHour} hasta las ${endHour} del día ${format(
          parsedDate,
          "eeee d MMMM",
          { locale: es }
        )} estan nuevamente disponibles.`,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//crear controlador para eliminar intervalor por id
