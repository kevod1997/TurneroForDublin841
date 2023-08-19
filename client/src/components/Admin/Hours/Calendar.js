import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { registerLocale } from "react-datepicker";
import { format, getDay } from "date-fns";
registerLocale("es", es);

const Calendar = ({
  startTime,
  setStartTime,
  pickDayForHours,
  setPickDayForHours,
  endTime,
  setEndTime,
  hours,
  setHours,
}) => {
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 1;
  };

  console.log(startTime, endTime);
  console.log(hours);

  return (
    <div className="flex-col justify-center">
      <div className="my-2 flex justify-center">
        <p className="text-center">Selecciona un dia</p>
      </div>
      <div className="mt-6 mb-10 flex justify-center">
        <DatePicker
        //   selected={pickDayForHours}
          onChange={(date) => {
            console.log(format(date, "yyyy-MM-dd"));
            setPickDayForHours(format(date, "yyyy-MM-dd"));
          }}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          locale="es"
          filterDate={isWeekday}
        />
      </div>
      <p className="text-center">
        Elegi el intervalo de horas que quizas cancelar
      </p>
      <div className="mt-2 mb-4 flex justify-center">
        <div className="flex justify-between">
          {/* <div className=" text-center">
            <p>Inicio</p>
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              filterDate={isWeekday}
            />
          </div>
          <div className=" text-center">
            <p>Fin</p>
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              showTimeSelectOnly
              showTimeSelect
              timeCaption="Time"
              dateFormat="HH:mm"
              filterDate={isWeekday}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
