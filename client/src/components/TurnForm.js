import { useTurns } from "../context/TurnContext";

const Turnos = ({ selectedTime, handleSelectedTime, selectedDay }) => {
  const { turns, turnError, selectedPeriod, setSelectedPeriod } = useTurns();

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

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

  const style = `bg-white p-3 md:p-4 rounded-lg shadow hover:opacity-50 ${
    selectedPeriod === selectedTime
      ? "bg-green-500 text-white hover:opacity-100"
      : ""
  }`;
  const isTimeAvailable = filteredTimes.includes(selectedTime);
  console.log(turns);
  return (
    <>
      <div className="mt-8 mb-4">
        {!turnError && (
          <div className="flex items-center mb-4">
            <p className="text-lg font-medium leading-normal text-gray-800 ml-3 ">
              Horarios disponibles
            </p>
            <div className="ml-6">
              <div className="flex">
                <button
                  type="button"
                  className={`flex-grow px-4 py-2 mb-2 rounded-lg ${
                    selectedPeriod === "morning"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => handlePeriodChange("morning")}
                >
                  Mañana
                </button>
                <button
                  type="button"
                  className={`flex-grow px-4 py-2 rounded-lg ml-4 mr-6 mb-2 ${
                    selectedPeriod === "afternoon"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => handlePeriodChange("afternoon")}
                >
                  Tarde
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="container mx-auto">
          {selectedPeriod === "" && turns.length > 0 ? (
            <p className="text-center text-red-500 font-bold">
              Por favor selecciona un horario.
            </p>
          ) : null}
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
          {selectedTime && selectedDay && isTimeAvailable ? (
            <div className="border rounded">
              <p className="m-4 text-center text-black font-bold">
                {" "}
                Selecionaste el turno de las {selectedTime} horas del dia{" "}
                {selectedDay}.{" "}
              </p>
            </div>
          ) : (
            ""
          )}
          <div className="grid grid-cols-3 sm:grid-cols-2lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
            {filteredTimes.map((time, index) => (
              <button
                type="button"
                key={index}
                className={style}
                onClick={() => handleTimeSelect(time)}
              >
                <p className="text-lg font-medium text-gray-800">{time}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Turnos;
