import { setMinutes, setHours, subHours, endOfDay} from "date-fns";

export function isTurnInPast(parsedDate, hour) {
  // Parsear la fecha del turno y la hora del turno a objetos Date
  const [hours, minutes] = hour.split(":");
  const parsedTurnHour = setMinutes(setHours(parsedDate, hours), minutes);
  const turnHour = subHours(parsedTurnHour, 3);
  const currentDate = subHours(new Date(), 3);
  console.log(turnHour, currentDate);

  // Verificar si la fecha y hora del turno son anteriores al inicio del minuto actual
  const isTurnInPast = turnHour > currentDate;
  console.log(isTurnInPast);
  return isTurnInPast;
}

// Función de utilidad para verificar si una fecha ya ha pasado
export function isDateInPast(date) {
  date = endOfDay(date);
  const currentDate = subHours(new Date(), 3);
  console.log(currentDate);
  return date < currentDate;
}


