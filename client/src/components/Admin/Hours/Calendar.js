import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { registerLocale } from "react-datepicker";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAdmin } from "../../../context/AdminContext";
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
  const [selectedTime, setSelectedTime] = useState();
 const {isAvailableDay, addAdminHours} = useAdmin()

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);

      const hours = {
        startHour: data.startTime,
        endHour: data.endTime,
        date: data.date
      };

      await addAdminHours(hours); // Asumo que addAdminHours es una función asíncrona

      setStartTime("");
      setEndTime("");
      setPickDayForHours("");
      setSelectedTime(null);
      reset();

      alert("Horas canceladas exitosamente"); // Alerta en caso de éxito
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al cancelar las horas");
    }
  });

  return (
    <div className="flex-col justify-center">
      <div className="my-2 flex justify-center">
        <p className="text-center">Selecciona un dia</p>
      </div>
      <div className="mt-6 mb-10 flex justify-center">
        <DatePicker
          selected={selectedTime}
          onChange={(date) => {
            setSelectedTime(date);
            setPickDayForHours(format(date, "yyyy-MM-dd"));
            setStartTime("");
            setEndTime("");
          }}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          locale="es"
          filterDate={isAvailableDay}
        />
      </div>
      {pickDayForHours && (
        <form onSubmit={onSubmit}>
          <p className="text-center">
            Elegi el intervalo de horas que quizas cancelar
          </p>
          <div className="mt-2 mb-4 flex justify-center gap-10">
            <div className="text-center">
              <label htmlFor="startTime" className="mr-4">
                Inicio
              </label>
              <select
                onChange={(e) => {
                  console.log(e.target.value);
                  setStartTime(e.target.value);
                }}
                className="p-2"
                id="startTime"
                {...register("startTime", {
                  required: "Este campo es obligatorio",
                })}
              >
                {hours.map((hour, index) => (
                  <option key={index} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              {errors.startTime && (
                <span className="text-red-500 text-sm">
                  {errors.startTime.message}
                </span>
              )}
            </div>
            <div className="text-center">
              <label htmlFor="endTime" className="mr-4">
                Fin
              </label>
              <select
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
                className="p-2"
                id="endTime"
                {...register("endTime", {
                  required: "Este campo es obligatorio",
                })}
              >
                {hours.map((hour, index) => (
                  <option key={index} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              {errors.endTime && (
                <span className="text-red-500 text-sm">
                  {errors.endTime.message}
                </span>
              )}
               <input
                type="text"
                id="date"
                {...register("date", {
                  required: "Este campo es obligatorio",
                })}
                value={pickDayForHours}
                readOnly
                className={`mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 hidden`}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className=" px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 font-bold text-white shadow-lg shadow-green-200 transition ease-in-out duration-200 translate-10"
              type="submit"
            >
              Cancelar horas
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Calendar;
