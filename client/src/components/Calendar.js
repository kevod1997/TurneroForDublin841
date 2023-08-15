import { addDays, format, getDay } from "date-fns";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { useTurns } from "../context/TurnContext";
registerLocale("es", es);

function Calendar({ handleSelectedTime, handleSelectedDay }) {
  const {startDate, setStartDate} = useTurns()
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 1;
  };

  return (
    <div className="flex justify-start text-lg mt-2">
      <p className="ml-3">Fecha:</p>
      <DatePicker
        filterDate={isWeekday}
        className="ml-3"
        dateFormat="dd/MM/yyyy"
        locale="es"
        minDate={new Date()}
        maxDate={addDays(new Date(), 30)}
        onChange={(date) => {
          setStartDate(date);
          handleSelectedTime()
          handleSelectedDay(format(date, "yyyy-MM-dd")); // Llama a la función para guardar la fecha seleccionada
        }}
        placeholderText="Elegi una fecha"
        selected={startDate}
      />
    </div>
  );
}

export default Calendar;
