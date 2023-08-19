import { useState } from "react";
import { useAdmin } from "../../../context/AdminContext";
import Calendar from "./Calendar";

const CancelledHours = () => {
  const [showCancelledDays, setShowCancelledDays] = useState(false);
  const {hours, setHours, hourError, startTime, setStartTime, endTime, setEndTime,  pickDayForHours,
    setPickDayForHours} = useAdmin();
  

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
        {showCancelledDays ? <Calendar startTime={startTime} setStartTime={setStartTime} pickDayForHours={pickDayForHours} setPickDayForHours={setPickDayForHours} endTime={endTime} setEndTime={setEndTime} hours={hours} setHours={setHours} /> : <ViewCancelledDays />}
      </div>
    </div>
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
