import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { registerLocale } from "react-datepicker";
import { format, isAfter } from "date-fns";
import { useEffect, useState } from "react";
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
  getUpdatedCancelleHours,
  hours,
  setHours,
}) => {
  const [selectedTime, setSelectedTime] = useState();
  const { isAvailableDay, addAdminHours } = useAdmin();
  console.log(pickDayForHours);
  console.log(hours);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setHours([]);
    setPickDayForHours("");
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const hours = {
      startHour: data.startTime,
      endHour: data.endTime,
      date: data.date,
    };
    try {
      await addAdminHours(hours);
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

  // Obtiene los valores actuales de startTime y endTime usando watch
  const startTimeValue = watch("startTime", "");
  const endTimeValue = watch("endTime", "");

  // Determina si el botón debe estar deshabilitado
  const endTimeIsOverStartTime = isAfter(
    new Date(`2000-01-01T${startTimeValue}`),
    new Date(`2000-01-01T${endTimeValue}`)
  );
  const isButtonDisabled =
    !startTimeValue || !endTimeValue || endTimeIsOverStartTime || !selectedTime;

  return (
    <div className="flex-col justify-center">
      {!selectedTime && (
        <div className="my-2 flex justify-center">
          <p className="text-center">🔽 Selecciona un dia 🔽</p>
        </div>
      )}
      <div className="mt-6 mb-6 flex justify-center gap-2">
        {selectedTime && (
          <div className="flex justify-center">
            <p className="text-center">Dia elegido:</p>
          </div>
        )}
        <DatePicker
          placeholderText="Clickea aqui para elegir"
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
      {selectedTime && (
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
          {endTimeIsOverStartTime && (
            <span className="text-red-500 text-sm">
              La hora de fin debe ser posterior a la hora de inicio
            </span>
          )}
          <div className="flex justify-center">
            <button
              className={`px-4 py-2 rounded-lg ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500"
              } font-bold text-white shadow-lg shadow-green-200 transition ease-in-out duration-200 translate-10`}
              type="submit"
              disabled={isButtonDisabled}
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
