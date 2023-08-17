import { format, getDay } from "date-fns";
import DatePicker from "react-datepicker";
import { useAdmin } from "../../../context/AdminContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const AddCancelledDays = () => {
  const { register, handleSubmit, reset, clearErrors, formState: {errors} } = useForm();
  const { startDate, setStartDate, endDate, setEndDate, addDayAdmin, dayError } = useAdmin();

  const isWeekday = (dates) => {
    const day = getDay(dates);
    return day !== 0 && day !== 1;
  };

  const onSubmit = handleSubmit((dates)=>{
    const { startDate, endDate } = dates;

  const cancelledDays = {
    startDate: startDate,
    endDate: endDate,
  };

  addDayAdmin(cancelledDays);
  startDate === endDate ? alert(`Cancelaste el dia ${startDate}`) : alert(`Cancelaste desde el ${startDate} al ${endDate}`);
  setStartDate('');
  setEndDate('');
  reset();
  });
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

  return (
    <>
      <DatePicker
        filterDate={isWeekday}
        selected={startDate}
        onChange={(dates) => {
          const [start, end] = dates;
          setStartDate(start);
          setEndDate(end);
          console.log(start, end);
        }}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        dateFormat="dd/MM/yyyy"
        locale="es"
        minDate={new Date()}
      />

      <form onSubmit={onSubmit}>
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
              {...register("startDate", {required: "Selecciona el o los dias que quieras cancelar"})}
              id="startDate"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md "
              value={startDate ? startDate : ""}
            />
            {errors.startDate && <span className="text-red-500 text-xs">{errors.startDate.message}</span>}
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
              {...register("endDate", {required: "Selecciona el o los dias que quieras cancelar"})}
              id="endDate"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={endDate ? endDate : ""}
            />
            {errors.endDate && <span className="text-red-500 text-xs">{errors.endDate.message}</span>}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className=" px-4 py-2 mt-4 rounded-lg bg-green-600 hover:bg-green-500 font-bold text-white shadow-lg shadow-green-200 transition ease-in-out duration-200 translate-10"
            type="submit"
          >
            Cancelar dias
          </button>
        </div>
      </form>
    </>
  );
};

export default AddCancelledDays;
