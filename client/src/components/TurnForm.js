import { useTurns } from "../context/TurnContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Turnos = ({
  selectedTime,
  handleSelectedTime,
  selectedDay,
  closeModal,
}) => {
  const { turns, turnError, selectedPeriod, setSelectedPeriod, startDate } =
    useTurns();
  const MySwal = withReactContent(Swal);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  // const handleToggle = () => {
  //   setSelectedPeriod(selectedPeriod === "morning" ? "afternoon" : "morning");
  // };
  const switchStyle =
  "mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]";

  const handleTimeSelect = (time) => {
    handleSelectedTime(time); // Llama a la función del abuelo para guardar la hora seleccionada
  };

  // Filtrar los turnos según las opciones seleccionadas por el usuario
  const filteredTimes = Array.isArray(turns)
    ? turns.filter((time) => {
        const hour = parseInt(time.split(":")[0], 10);
        if (selectedPeriod === "morning") {
          return hour >= 8 && hour < 13;
        } else if (selectedPeriod === "afternoon") {
          return hour >= 13 && hour < 20;
        } else {
          return "";
        }
      })
    : [];
      console.log(filteredTimes, turns);

  return (
    <>
      <div className="m-4">
        {selectedTime && selectedDay ? (
          <div className="border rounded">
            <p className="m-4 text-center text-black font-bold">
              {" "}
              Tu turno seleccionado es el de las {selectedTime} horas del dia{" "}
              {selectedDay}.{" "}
            </p>
          </div>
        ) : (
          ""
        )}
        {selectedDay && !selectedTime && !turnError && filteredTimes.length > 0 ? (
          <div className="border rounded">
            <p className="m-4 text-center text-red-600 font-bold">
              Por favor elegi un horario.
            </p>
          </div>
        ) : (
          ""
        )}
        {!selectedDay ? (
          <div className="border rounded">
            <p className="m-4 text-center text-red-600 font-bold">
              Por favor elegi una fecha.
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="mb-4">
      {!turnError && startDate && turns.length > 0 && (
  <>
    <div className="flex items-center mb-4">
      <p className="text-lg font-medium leading-normal text-gray-800 ml-3 ">
        Horarios disponibles
      </p>
      <div className="ml-6">
        <div className="flex items-center">
          <span  className={`p-[0.15rem] px-1  cursor-pointer ${
                selectedPeriod === "morning"
                  ? "text-lg text-indigo-600 bg-indigo-100 border-indigo-300 border rounded-lg"
                  : "text-lg text-gray-400"
              }`}>Mañana</span>
          <label className="inline-block relative">
            <input
              className={switchStyle}
              type="checkbox"
              checked={selectedPeriod === "afternoon"}
              onChange={() =>
                handlePeriodChange(
                  selectedPeriod === "morning" ? "afternoon" : "morning"
                )
              }
            />
            <span   className={`p-[0.15rem] px-1 cursor-pointer ${
                selectedPeriod === "afternoon"
                  ? " text-lg text-indigo-600 bg-indigo-100 border-indigo-300 border rounded-lg"
                  : "text-lg text-gray-400"
              }`}>
              Tarde
            </span>
          </label>
        </div>
      </div>
    </div>

  </>
)}
        <div className="container mx-auto">
          {/* {selectedPeriod === "" && turns.length > 0 ? (
            <p className="text-center text-red-500 font-bold">
              Por favor selecciona un horario.
            </p>
          ) : null} */}
          {selectedPeriod !== "" &&
          selectedDay &&
          filteredTimes.length === 0 &&
          !turnError ? (
            <p className="text-center text-red-500 font-bold m-20">
              No hay turnos disponibles.
            </p>
          ) : null}
          {turnError ? (
            <p className="text-center text-red-500 font-bold m-20">
              {turnError}
            </p>
          ) : (
            ""
          )}
          {startDate && (
            <div className="grid grid-cols-3 sm:grid-cols-2lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
              {filteredTimes.map((time, index) => (
                <button
                  type="button"
                  key={index}
                  className={`bg-white p-3 md:p-4 rounded-lg shadow hover:opacity-50 ${
                    time === selectedTime ? "bg-green-500 text-white hover:opacity-100" : ""
                  }`}
                  onClick={() => {
                    handleTimeSelect(time);
                    setTimeout(() => {
                      MySwal.fire({
                        title:
                          "Seleccionaste el turno del dia " +
                          selectedDay +
                          " a las " +
                          time + // Utiliza 'time' en lugar de 'selectedTime'
                          " horas",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Volve y saca tu turno",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          closeModal();
                        }
                      });
                    }, 500);
                  }}
                >
                  <p className="text-lg font-medium text-gray-800">{time}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Turnos;
