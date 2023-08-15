import { addDays, getDay } from "date-fns";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("es", es);

function Calendar({ pickDay, setPickDay }) {


  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 1;
  };

  return (
    <div className="flex justify-center text-lg mt-2">
      <p className="ml-3">Fecha:</p>
      <DatePicker
        filterDate={isWeekday}
        className="ml-3"
        dateFormat="dd/MM/yyyy"
        locale="es"
        minDate={new Date()}
        maxDate={addDays(new Date(), 30)}
        onChange={(date) => {
          setPickDay(date); 
        }}
        placeholderText="Elegi una fecha"
        selected={pickDay}
      />
    </div>
  );
}

export default Calendar;
