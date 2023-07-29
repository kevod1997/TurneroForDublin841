import { parseISO, toDate } from "date-fns";
import Turno, { turnSchema } from "../models/Turno.js";
import {
  availablesHours,
  getAvailableTurns,
  isHourAvailable,
} from "../utils/hours.js";
import mongoose from "mongoose";

export const getTurns = async (req, res) => {
  try {
    const turns = await Turno.find();
    return res.json(turns);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTurnsByMonth = async (req, res) => {
  try {
    const year = parseInt(req.params.year); // Obtener el año de los parámetros de la URL y convertirlo a número entero
    const month = parseInt(req.params.month); // Obtener el mes de los parámetros de la URL y convertirlo a número entero
    console.log(year, month);

    // Formar el nombre de la colección según el año y mes
    const collectionName = `Turnos_${year}_${month}`;
    console.log(collectionName);
    // Consultar los turnos en la colección correspondiente
    const turns = await mongoose.connection.collection(collectionName).find({}).toArray();
    console.log(turns);
    return res.json(turns);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const getTurn = async (req,res) =>{
//     try {
//         const turnFind = await Turno.findById(req.params.id)
//         if (!turnFind) return res.sendStatus(404)
//         return res.json(turnFind)
//     } catch (error) {
//         return res.status(500).json({message: error.message})
//     }
// }

export const createTurn = async (req, res) => {
  try {
    const { name, phone, day, hour, corte } = req.body;

    // Utilizar parseISO de date-fns para analizar la fecha en formato ISO 8601 (AAAA-MM-DD)
    const parsedDay = parseISO(day);
    console.log(parsedDay);

    // Formar el nombre de la colección según el año y mes del turno
    const collectionName = `Turnos_${parsedDay.getFullYear()}_${
      parsedDay.getMonth() + 1
    }`;

   // Verificar si la colección mensual existe, si no, crearla
   const collectionExists = await mongoose.connection.db.listCollections({ name: collectionName }).next();

   if (!collectionExists) {
     await mongoose.connection.createCollection(collectionName);
   }
    // Verificar que dia de la semanas es, para saber si la peluqueria esta abierta y si hay turno disponible en la hora solicitada
    const weekDay = parsedDay
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    const availableHours = availablesHours[weekDay.toLowerCase()];
    console.log("availableHours:", availableHours);

    // Verificar si el dia esta disponible
    if (!availableHours) {
      return res.status(400).json({
        error: `No trabajamos el dia ${parsedDay.toLocaleDateString("es-ES", {
          weekday: "long",
        })}. Por favor, seleccione un día hábil.`,
      });
    }
    // Verificar las horas disponibles para el dia seleccionado
    getAvailableTurns(parsedDay)
      .then((turns) => {
        const availableTurns = turns.availableTurns;
        const notAvailableTurns = turns.notAvailableTurns;
        console.log("Turnos disponibles:", availableTurns);
        console.log("Turnos no disponibles:", notAvailableTurns);
      })
      .catch((error) => {
        console.error("Error al obtener los turnos disponibles:", error);
      });

    // Verificar si la hora solicitada está disponible
    if (!availableHours || !isHourAvailable(hour, availableHours)) {
      return res.status(400).json({
        error: `En el dia ${parsedDay.toLocaleDateString("es-ES", {
          weekday: "long",
        })} no hay turnos disponibles a las ${hour}. Por favor, seleccione otro horario`,
      });
    }

    // Verificar si ya existe un turno con la misma fecha y hora
    const existingTurn = await Turno.findOne({ day: parsedDay, hour });
    console.log("existingTurn:", existingTurn);
    if (existingTurn) {
      return res
        .status(400)
        .json({ error: "Ya hay un turno asignado a esa hora." });
    }

    // Formatear la fecha en el formato deseado (DD-MM-AAAA)
    const formattedDay = toDate(parsedDay, "dd-MM-yyyy");
    console.log(formattedDay);

    // Obtener la referencia al modelo dinámico para la colección correspondiente
    const TurnoModel = mongoose.connection.models[collectionName] || mongoose.model("Turno", turnSchema, collectionName);


    // Guardar el turno en la colección correspondiente
    const newTurn = new TurnoModel({ name, phone, day: formattedDay, hour, corte });

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
}
