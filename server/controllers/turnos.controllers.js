import { parse, parseISO, toDate } from "date-fns";
import Turno from "../models/Turno.js";
import { availablesHours, isHourAvailable } from "../utils/hours.js";

// export const getTurns = async (req,res) => {
//     try {
//         const turns = await Turno.find()
//         return res.json(turns)
//     } catch (error) {
//         return res.status(500).json({message: error.message})

//     }
// }

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

    // Verificar si el día es sábado y si la hora solicitada está disponible
    const weekDay = parsedDay.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    console.log(weekDay);
    console.log(hour);
    const availableHours = availablesHours[weekDay.toLowerCase()];
    console.log('availableHours:', availableHours);

    if (!availableHours || !isHourAvailable(hour, availableHours)) {
      return res.status(400).json({ error: 'La hora solicitada no está disponible para el día especificado.' });
    }

    // Formatear la fecha en el formato deseado (DD-MM-AAAA)
    const formattedDay = toDate(parsedDay, 'dd-MM-yyyy');
    console.log(formattedDay);

    const newTurn = new Turno({ name, phone, day: formattedDay, hour, corte });

    await newTurn.save();
    return res.json(newTurn);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const deleteTurn = async (req,res)=>{
//     try {
//         const turnRemoved = await Turno.findByIdAndDelete(req.params.id)
//         if(!turnRemoved) return res.sendStatus(404)
//         return res.sendStatus(504)
//     } catch (error) {
//         return res.status(500).json({message: error.message})
//     }
// }
