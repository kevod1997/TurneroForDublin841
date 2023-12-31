import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { useAdmin } from "../../../context/AdminContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const AddCancelledDays = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    addDayAdmin,
    getUpdatedCancelledDays,
    isAvailableDay,
    getDaysAdmin,
    setCancelledDays,
    setDayError,
  } = useAdmin();

  const onSubmit = handleSubmit(async (dates) => {
    const { startDate, endDate } = dates;

    const cancelledDays = {
      startDate: startDate,
      endDate: endDate,
    };

    setStartDate("");
    setEndDate("");
    reset();
    try {
      const returnedMessage = await addDayAdmin(cancelledDays);
      alert(returnedMessage.message);
      getUpdatedCancelledDays();
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    (async () => {
      const daysData = await getDaysAdmin();
      if (Array.isArray(daysData)) {
        setDayError(null);
        setCancelledDays(daysData);
      } else {
        setCancelledDays([]);
        setDayError(daysData);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (startDate && endDate) {
      // Formatear las fechas en el formato yyyy-MM-dd
      const formattedStartDate = format(new Date(startDate), "yyyy-MM-dd");
      const formattedEndDate = format(new Date(endDate), "yyyy-MM-dd");
      // Cuando hay valor en selectedDay y selectedTime, forzar un re-renderizado
      // para que los inputs muestren los valores seleccionados
      reset({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    }
  }, [startDate, endDate, reset]);
  const isButtonDisabled = !startDate || !endDate;

  return (
    <>
      <div className="flex justify-center">
        <DatePicker
          filterDate={isAvailableDay}
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          dateFormat="dd/MM/yyyy"
          locale="es"
          minDate={new Date()}
        />
      </div>
      <div className="mt-2">
        {startDate && !endDate && (
          <p className="text-center mt-2 text-bold text-xs">
            Seleciona la fecha de fin(puede ser el mismo u otro dia)
          </p>
        )}
        {!startDate && !endDate && (
          <p className="text-center mt-2 text-bold text-xs">
            Seleciona una fecha de inicio y de fin(el dia puede coincidir)
          </p>
        )}
      </div>
      <form onSubmit={onSubmit}>
        {startDate && endDate && (
          <div className="mt-2">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha de inicio
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="startDate"
                {...register("startDate", {
                  required: "Selecciona el o los dias que quieras cancelar",
                })}
                id="startDate"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md "
                value={startDate ? startDate : ""}
              />
              {errors.startDate && (
                <span className="text-red-500 text-xs">
                  {errors.startDate.message}
                </span>
              )}
            </div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 mt-2"
            >
              Fecha de fin
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="endDate"
                placeholder="Selecciona el mismo u otro dia"
                {...register("endDate", {
                  required: "Selecciona el o los dias que quieras cancelar",
                })}
                id="endDate"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={endDate ? endDate : ""}
              />
              {errors.endDate && (
                <span className="text-red-500 text-xs">
                  {errors.endDate.message}
                </span>
              )}
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <button
            className={`px-4 py-2 mt-4 rounded-lg ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500"
            } font-bold text-white shadow-lg shadow-green-200 transition ease-in-out duration-200 translate-10`}
            type="submit"
            disabled={isButtonDisabled}
          >
            Cancelar dias
          </button>
        </div>
      </form>
    </>
  );
};

export default AddCancelledDays;
