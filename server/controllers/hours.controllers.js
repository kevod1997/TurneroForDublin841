import {
  parseISO,
  format,
  isWithinInterval,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import es from "date-fns/locale/es/index.js";
import CancelledHours from "../models/hours.model.js";
import UnavailableDays from "../models/days.model.js";
import { isDateInPast } from "../utils/date.js";
import { availablesHours } from "../utils/hours.js";

export const getCancelledHours = async (req, res) => {
  try {
    const cancelledHours = await CancelledHours.find();
    if (cancelledHours.length === 0) {
      return res.status(404).json({ message: "No hay horas canceladas" });
    }
    return res.json(cancelledHours);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAvailableHours = async (req, res) => {
  try {
    const { date } = req.params; 
    const adjustedDate = new Date(date); 
    adjustedDate.setHours(adjustedDate.getHours() + 3)

    const cancelledHours = await CancelledHours.find({ date: new Date(adjustedDate) });
    console.log(cancelledHours);

    const dayOfWeek = new Date(adjustedDate).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    console.log(dayOfWeek);
    const allAvailableHours = availablesHours[dayOfWeek] || [];

    // Filtra las horas disponibles para excluir las horas canceladas
    const filteredAvailableHours = allAvailableHours.filter((hour) => {
      const isCancelled = cancelledHours.some((cancelledHour) => {
        const cancelledStart = cancelledHour.startHour;
        const cancelledEnd = cancelledHour.endHour;
        const currentHour = hour; // La hora actual en formato "HH:mm"
    
        return (
          currentHour >= cancelledStart && currentHour <= cancelledEnd
        );
      });
      return !isCancelled;
    });
    
    return res.json(filteredAvailableHours);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCancelledHoursByWeek = async (req, res) => {
  try {
    const { week } = req.params;
    const parsedWeek = parseISO(week);
    const WeekStart = startOfWeek(parsedWeek);
    const WeekEnd = endOfWeek(parsedWeek);

    const cancelledHours = await CancelledHours.find({
      date: { $gte: WeekStart, $lte: WeekEnd },
    });

    if (cancelledHours.length === 0) {
      return res.status(404).json({
        message: `No hay horas canceladas para la semana del ${format(
          parsedWeek,
          "d MMMM",
          { locale: es }
        )}`,
      });
    } else {
      return res.json(cancelledHours);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const cancelHours = async (req, res) => {
  try {
    const { date, startHour, endHour } = req.body;

    // Convertir la fecha en un objeto Date
    const parsedDate = parseISO(date);

    if (isDateInPast(parsedDate)) {
      return res.status(400).json({
        message: "No es posible cancelar horas de una fecha que ya ha pasado.",
      });
    }

    //Verificar que el dia no sea domingo o lunes
    if (
      format(parsedDate, "eeee", { locale: es }) === "domingo" ||
      format(parsedDate, "eeee", { locale: es }) === "lunes"
    ) {
      return res.status(400).json({
        message: `No se puede cancelar horas los dias domingos o lunes.`,
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
        message:
          "El intervalo de horas que intentas cancelar ya está ocupado por otros turnos cancelados. Vos estas intentado poner un turno de " +
          startHour +
          " a " +
          endHour +
          " cuando los turnos cancelados son: " +
          cancelledHoursIntervals.map(
            (interval) =>
              format(interval.startTime, "HH:mm", { locale: es }) +
              " a " +
              format(interval.endTime, "HH:mm", { locale: es })
          ) +
          ". Los turnos no se pueden superponer.",
      });
    }

    const cancelledInterval = new CancelledHours({
      date: parsedDate,
      startHour,
      endHour,
    });

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

    const parsedDate = parseISO(date);

    const existingCancelledHours = await CancelledHours.find({
      date: parsedDate,
      $or: [
        {
          $and: [
            { startHour: { $lte: startHour } },
            { endHour: { $gte: startHour } },
          ],
        },
        {
          $and: [
            { startHour: { $lte: endHour } },
            { endHour: { $gte: endHour } },
          ],
        },
        {
          $and: [
            { startHour: { $gte: startHour } },
            { endHour: { $lte: endHour } },
          ],
        },
      ],
    });

    if (existingCancelledHours.length > 1) {
      return res.status(400).json({
        message:
          "El intervalo de horas se superpone con otro intervalo cancelado existente.",
      });
    }

    // Si no hay superposición, actualizar el intervalo de horas cancelado en la base de datos
    if (cancelledHour) {
      await CancelledHours.findByIdAndUpdate(
        id,
        {
          date: parsedDate,
          startHour,
          endHour,
        },
        { overwrite: false }
      );
    }

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
        )} estan nuevamente disponibles.
        Los siguientes turnos estan nuevamente disponibles: ${cancelledHours.map(
          (cancelledHour) =>
            format(parseISO(`2000-01-01T${cancelledHour.startHour}`), "HH:mm", {
              locale: es,
            }) +
            " a " +
            format(parseISO(`2000-01-01T${cancelledHour.endHour}`), "HH:mm", {
              locale: es,
            })
        )}`,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCancelledHoursById = async (req, res) => {
  try {
    const id = req.params.id;

    const cancelledHour = await CancelledHours.findById(id);
    if (!cancelledHour) {
      return res.status(404).json({ message: "No se encontró el documento." });
    }

    const { date, startHour, endHour } = cancelledHour;

    await CancelledHours.findByIdAndDelete(id);

    return res.json({
      message: `El intervalo de horas desde las ${startHour} hasta ${endHour} del día ${format(
        date,
        "eeee d MMMM",
        { locale: es }
      )} ha sido eliminado.`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
