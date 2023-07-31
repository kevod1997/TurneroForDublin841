import {isWithinInterval, parseISO } from "date-fns";
import Turno from "../models/Turno.js";
import CancelledHours from "../models/CancelledHours.js";

export const availablesHours = {
  tuesday: [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ],
  wednesday: [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ],
  thursday: [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ],
  friday: [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ],
  saturday: [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
  ],
};

// Función para comparar las horas en formato 'HH:mm'
export const isHourAvailable = (hour, availableHours) => {
  // console.log(hour, availableHours);
  return availableHours.some((availableHour) => availableHour === hour);
};

// Funcion para ver que turnos quedan disponibles en el dia elegido
export const getAvailableTurns = async (parsedDay) => {
  try {
    // Asegurarse de que parsedDay sea un objeto Date
    if (typeof parsedDay === "string") {
      parsedDay = parseISO(parsedDay);
    }

    // Obtener el nombre del día de la semana en minúsculas
    const weekDay = parsedDay
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    const availableHours = availablesHours[weekDay];

    // Si no hay horas disponibles para el día elegido, lanzar un error
    if (!availableHours) {
      throw new Error(
        `No se encontraron horas disponibles para el día ${weekDay}`
      );
    }

    const takenTurns = await Turno.find({ day: parsedDay });
    console.log("takenTurns:", takenTurns);

    const cancelledHours = await CancelledHours.find({ date: parsedDay });
    console.log("cancelledHours:", cancelledHours);

    // Filtrar los intervalos de horas cancelados para obtener una lista de horas no disponibles
    const unavailableHours = cancelledHours.map((cancelledHour) => {
      const { startHour, endHour } = cancelledHour;
      const startTime = parseISO(`2000-01-01T${startHour}`);
      const endTime = parseISO(`2000-01-01T${endHour}`);
      return { startTime, endTime };
    });

    console.log("unavailableHours:", unavailableHours);

    // Filtrar las horas tomadas y las horas canceladas para obtener las horas disponibles
    const availableTurns = availableHours.filter((availableHour) => {
      return (
        !takenTurns
          .map((takenTurn) => takenTurn.hour)
          .includes(availableHour) &&
        !unavailableHours.some((unavailableHour) =>
          isWithinInterval(parseISO(`2000-01-01T${availableHour}`), {
            start: unavailableHour.startTime,
            end: unavailableHour.endTime,
          })
        )
      );
    });

    const notAvailableTurns = availableHours.filter((availableHour) => {
      return (
        takenTurns.map((takenTurn) => takenTurn.hour).includes(availableHour) ||
        unavailableHours.some((unavailableHour) =>
          isWithinInterval(parseISO(`2000-01-01T${availableHour}`), {
            start: unavailableHour.startTime,
            end: unavailableHour.endTime,
          })
        )
      );
    });

    const turns = {
      availableTurns: availableTurns,
      notAvailableTurns: notAvailableTurns,
    };
    console.log("turns:", turns);
    return turns;
  } catch (error) {
    return new Error(error.message);
  }
};

// Funcion para ver que turnos quedan disponibles en el dia elegido (version anterior) - UNA SOLA FUNCION!!!

// Filtrar las horas tomadas y las horas canceladas para obtener las horas disponibles y no disponibles
// const { availableTurns, notAvailableTurns } = availableHours.reduce(
//   (result, availableHour) => {
//     const isHourTaken = takenTurns
//       .map((takenTurn) => takenTurn.hour)
//       .includes(availableHour);

//     const isHourUnavailable = unavailableHours.some((unavailableHour) =>
//       isWithinInterval(parseISO(`2000-01-01T${availableHour}`), {
//         start: unavailableHour.startTime,
//         end: unavailableHour.endTime,
//       })
//     );

//     if (!isHourTaken && !isHourUnavailable) {
//       result.availableTurns.push(availableHour);
//     } else {
//       result.notAvailableTurns.push(availableHour);
//     }

//     return result;
//   },
//   { availableTurns: [], notAvailableTurns: [] }
// );

// const turns = {
//   availableTurns: availableTurns,
//   notAvailableTurns: notAvailableTurns,
// };
