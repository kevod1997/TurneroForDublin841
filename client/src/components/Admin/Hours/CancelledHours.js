import { setHours, setMinutes } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";

const CancelledHours = () => {
  const [showCancelledDays, setShowCancelledDays] = useState(false);

  return (
    <div className="flex flex-col items-center mt-8 mb-4">
      <div className="mb-4">
        <button
          onClick={() => setShowCancelledDays(false)}
          className={`px-4 py-2 mr-2 ${
            showCancelledDays ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded`}
        >
          Ver Horas Cancelados
        </button>
        <button
          onClick={() => setShowCancelledDays(true)}
          className={`px-4 py-2 ${
            showCancelledDays ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300"
          } text-white rounded`}
        >
          Cancelar Horas
        </button>
      </div>
      <div className="mt-4">
        {showCancelledDays ? <AddCancelledDays /> : <ViewCancelledDays />}
      </div>
    </div>
  );
};

const AddCancelledDays = () => {
  const [startDate, setStartDate] = useState();
  return (
    <>
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelectOnly
      showTimeSelect
      timeCaption="Time"
      dateFormat="HH:mm"
      // injectTimes={}

    />
    </>
  );
};

const ViewCancelledDays = () => {
  return (
    <div className="border border-gray-300 p-4 rounded bg-gray-100">
      {/* Aquí iría la visualización de los días cancelados */}
      <p>Calendario o lista de días cancelados</p>
    </div>
  );
};

export default CancelledHours;
