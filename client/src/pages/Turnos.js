import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import Modal from "../components/Modal";
import { useTurns } from "../context/TurnContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addDays, format } from "date-fns";
import es from "date-fns/locale/es/index";

function Turnos() {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MySwal = withReactContent(Swal);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();
  const {
    createTurn,
    setStartDate,
    setSelectedPeriod,
  } = useTurns();

  const handleSelectedTime = (time) => {
    setSelectedTime(time);
  };

  const handleSelectedDay = (date) => {
    setSelectedDay(date);
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true)
    const turn = {
      name: data.name,
      phone: data.phone,
      date: selectedDay,
      hour: selectedTime,
      service: data.service,
    };
    const response = await createTurn(turn);
    if (response.request.status === 200) {
      MySwal.fire({
        icon: "success",
        title: `Has solicitado un turno para el ${format(
          addDays(new Date(turn.date), 1),
          "d 'de' MMMM",
          { locale: es }
        )} a las ${
          turn.hour
        }, por favor en caso de no poder asistir avísanos con anticipación.`,
        showConfirmButton: true,
        timer: 10000,
      });
    } else if (response.response.status === 400) {
      MySwal.fire({
        icon: "error",
        title: response.response.data.error,
        showConfirmButton: true,
      });
    }
    setIsSubmitting(false);
    setSelectedDay();
    setSelectedTime();
    setStartDate();
    setSelectedPeriod("morning");
    reset();
  });

  useEffect(() => {
    if (selectedDay && selectedTime) {
      // Cuando hay valor en selectedDay y selectedTime, forzar un re-renderizado
      // para que los inputs muestren los valores seleccionados
      reset({
        date: selectedDay,
        hour: selectedTime,
      });
    }
  }, [selectedDay, selectedTime, reset]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(errors).length > 0) {
        clearErrors();
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [errors, clearErrors, onSubmit]);

  const whatsappRegex = /^(\+[0-9]{1,3})?[0-9]{9,}$/;

  return (
    <div className="flex flex-col m-4">
      <h2 className="text-xl text-center font-bold mb-4 mt-4 text-stone-600">
        TURNOS
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <form className="" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="font-medium text-sm text-stone-600"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Este campo es obligatorio" })}
                placeholder="Nombre completo"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="font-medium text-sm text-stone-600"
              >
                Telefono
              </label>
              <input
                type="text"
                id="phone"
                {...register("phone", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: whatsappRegex,
                    message: "Ingresa un número válido",
                  },
                })}
                placeholder="Codigo de area + numero"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="date"
                className="font-medium text-sm text-stone-600"
              >
                Fecha y Hora
              </label>
              <input
                type="text"
                id="date"
                {...register("date", {
                  required: "Este campo es obligatorio",
                })}
                value={selectedDay ? selectedDay : ""}
                readOnly
                className={`mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 ${
                  !selectedTime && !selectedDay ? "hidden" : ""
                }`}
              />

              <input
                type="text"
                {...register("hour", {
                  required: "Este campo es obligatorio",
                })}
                value={selectedTime ? selectedTime : ""}
                readOnly
                placeholder="Elegi un horario"
                id="hour"
                className={`mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 mb-2 ${
                  !selectedTime && !selectedDay ? "hidden" : ""
                }`}
              />
              {errors.hour && (
                <span className="text-red-500 text-sm">
                  {errors.hour.message}
                </span>
              )}

              <Modal
                selectedTime={selectedTime}
                handleSelectedTime={handleSelectedTime}
                selectedDay={selectedDay}
                handleSelectedDay={handleSelectedDay}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="service"
                className="font-medium text-sm text-stone-600"
              >
                Servicio
              </label>

              <select
                id="service"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                {...register("service", { required: true })}
              >
                <option value={"Corte"}>Corte</option>
                <option value={"Barba"}>Barba</option>
                <option value={"Corte y Barba"}>Corte y Barba</option>
              </select>
            </div>
          </div>
          <div className="grid md:flex grid-cols-2 md:justify-end space-x-4 w-full mt-6 md:mt-10">
            <Popover>
              <PopoverHandler>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg text-stone-50 bg-stone-400 hover:bg-stone-500 font-bold shadow-lg shadow-stone-200 transition ease-in-out duration-200 translate-10"
                >
                  Horarios
                </button>
              </PopoverHandler>
              <PopoverContent className="m-2">
                MARTES A VIERNES DE 8 A 12 y de 16 A 20. <br /> SABADOS DE 8 A
                16.
              </PopoverContent>
            </Popover>
            <button
              className={`px-4 py-2 rounded-lg ${
                selectedTime && selectedDay
                  ? "bg-green-600 hover:bg-green-500 animate-pulse-scale"
                  : "bg-stone-400 hover:bg-stone-500"
              } font-bold text-white shadow-lg shadow-stone-200 transition ease-in-out duration-200 translate-10`}
              type="submit"
              disabled={isSubmitting}
            >
  {isSubmitting ? (
    "Solicitando turno..."
  ) : (
    "Saca tu turno"
  )}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Turnos;
