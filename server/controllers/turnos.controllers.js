import { endOfWeek, format, parseISO, startOfWeek } from "date-fns";
import Turno from "../models/Turno.js";
import UnavailableDays from "../models/UnavailableDays.js";
import {
  availablesHours,
  getAvailableTurns,
  isHourAvailable,
} from "../utils/hours.js";
import es from "date-fns/locale/es/index.js";
// import CancelledHours from "../models/CancelledHours.js";


export const getTurn = async (req, res) => {
  try {
    const turn = await Turno.findById(req.params.id);
    if (!turn) {
      return res.sendStatus(404);
    }
    return res.json(turn);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTurnsByDay = async (req, res) => {
  try {
    const parsedDay = parseISO(req.params.day);

    const turns = await Turno.find({ day: parsedDay });

    if (turns) {
      return res.json(turns);
    } else {
      return res.status(404).json({
        message: `No hay turnos para el dia ${parsedDay.toLocaleDateString(
          "es-ES",
          {
            weekday: "long",
          }
        )}`,
      });
    }
  } catch (error) {
    console.error("Error al obtener los turnos:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getTurnsByWeek = async (req, res) => {
  try {
    //Obtener turnos por semana
    const { week } = req.params;
    const parsedWeek = parseISO(week);
    const WeekStart = startOfWeek(parsedWeek);
    const WeekEnd = endOfWeek(parsedWeek);
    console.log(WeekStart, WeekEnd);

    const turns = await Turno.find({
      day: { $gte: WeekStart, $lte: WeekEnd },
    });

    if (turns.length === 0) {

      return res
        .status(404)
        .json({
          message: `No hay turnos para la semana del ${format(
            parsedWeek,
            "d MMMM",
            { locale: es }
          )}`,
        });
    } else {    
        return res.json(turns);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTurn = async (req, res) => {
  try {
    const { name, phone, day, hour, corte } = req.body;

    // Utilizar parseISO de date-fns para analizar la fecha en formato (AAAA-MM-DD)
    const parsedDay = parseISO(day);

    // Verificar que dia de la semanas es, para saber si la peluqueria esta abierta y si hay turno disponible en la hora solicitada
    const weekDay = parsedDay
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    const availableHours = availablesHours[weekDay.toLowerCase()];
    if (!availableHours) {
      return res.status(400).json({
        error: `No trabajamos el dia ${parsedDay.toLocaleDateString("es-ES", {
          weekday: "long",
        })}. Por favor, seleccione un día hábil.`,
      });
    }

    // Verificar que el día no este cancelado
    const dayEnabled = await UnavailableDays.findOne({
      date: parsedDay,
      enabled: true,
    });
    if (dayEnabled) {
      return res.status(400).json({
        error: `No trabajamos el dia ${parsedDay.toLocaleDateString("es-ES", {
          weekday: "long",
        })}. Por favor, seleccione un día hábil.`,
      });
    }

    // Verificar las horas disponibles para el día seleccionado
    const turns = await getAvailableTurns(parsedDay);
    // Verificar si la hora solicitada está disponible
    if (!isHourAvailable(hour, turns.availableTurns)) {
      return res.status(400).json({
        error: `En el día ${parsedDay.toLocaleDateString("es-ES", {
          weekday: "long",
        })} no hay turnos disponibles a las ${hour}. Por favor, seleccione otro horario.`,
      });
    }

    // Guardar el turno en la colección correspondiente
    const newTurn = new Turno({
      name,
      phone,
      day: parsedDay,
      hour,
      corte,
    });

    await newTurn.save();
    return res.json(newTurn);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTurn = async (req, res) => {
  try {
    console.log(req.params.id);
    const turnRemoved = await Turno.findByIdAndDelete(req.params.id);
    if (!turnRemoved) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
