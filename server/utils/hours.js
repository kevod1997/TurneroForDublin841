import { parseISO } from "date-fns";
import Turno from "../models/Turno.js";

export const availablesHours = {
    tuesday: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'],
    wednesday: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'],
    thursday: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'],
    friday: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'],
    saturday: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'],
  };

  // Función para comparar las horas en formato 'HH:mm'
export const isHourAvailable = (hour, availableHours) => {
  return availableHours.some((availableHour) => availableHour === hour);
};

// Funcion para ver que turnos quedan disponibles en el dia elegido
export const getAvailableTurns = async (parsedDay) => {

  // Asegurarse de que parsedDay sea un objeto Date
  if (typeof parsedDay === 'string') {
    parsedDay = parseISO(parsedDay);
  }

  const weekDay = parsedDay.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

  const availableHours = availablesHours[weekDay];

  const takenTurns = await Turno.find({ day: parsedDay });

  const availableTurns = availableHours.filter((availableHour) => {
    return !takenTurns.map((takenTurn) => takenTurn.hour).includes(availableHour);
  });

  const notAvailableTurns = availableHours.filter((availableHour) => {
    return takenTurns.map((takenTurn) => takenTurn.hour).includes(availableHour);
  });
  const turns = {
    availableTurns: availableTurns,
    notAvailableTurns: notAvailableTurns
  };
  return  turns
}

