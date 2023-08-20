import { addDays } from "date-fns";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { useAdmin } from "../../../context/AdminContext";
registerLocale("es", es);

function Calendar({ pickDay, setPickDay }) {
  const { isAvailableDay } = useAdmin();

  return (
    <div className="flex justify-center text-lg mt-2">
      <p className="ml-3">Fecha:</p>
      <DatePicker
        filterDate={isAvailableDay}
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
