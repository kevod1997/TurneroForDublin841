import { parseISO } from "date-fns";
import { availablesHours } from "./hours.js";
import Turno from "../models/turn.model.js";
import CancelledHours from "../models/hours.model.js";

// Funcion para ver que turnos quedan disponibles en el dia elegido
export const getAvailableTurns = async (parsedDate) => {
    try {
      // Asegurarse de que parsedDate sea un objeto Date
      if (typeof parsedDate === "string") {
        parsedDate = parseISO(parsedDate);
      }
  
      // Obtener el nombre del día de la semana en minúsculas
      const weekDay = parsedDate
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();
  
      const availableHours = availablesHours[weekDay];
  
      // Si no hay horas disponibles para el día elegido, lanzar un error
      if (!availableHours) {
        throw new Error(
          `No se encontraron horas disponibles para el día ${weekDay}`
        );
      }
  
      // Filtrar los intervalos de horas cancelados para obtener una lista de horas no disponibles
      const cancelledHours = await CancelledHours.find({ date: parsedDate });
      const unavailableHours = cancelledHours.map((cancelledHour) => {
        const { startHour, endHour } = cancelledHour;
        const startTime = parseISO(`2000-01-01T${startHour}`);
        const endTime = parseISO(`2000-01-01T${endHour}`);
        return { startTime, endTime };
      });
  
      // Filtrar las horas tomadas y las horas canceladas para obtener las horas disponibles
      const takenTurns = await Turno.find({ date: parsedDate });
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
  