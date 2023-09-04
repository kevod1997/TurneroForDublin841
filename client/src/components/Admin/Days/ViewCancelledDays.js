import { useEffect, useState } from "react";
import { useAdmin } from "../../../context/AdminContext";
import { format, parseISO, getDay, addHours, addDays, subDays } from "date-fns";
import { isAfter } from "date-fns";
// import { subDays } from "date-fns";

const ViewCancelledDays = () => {
  const { cancelledDays, deleteDayAdmin, setCancelledDays } = useAdmin();
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    filterAndSortCancelledDays(cancelledDays);
    console.log("render");
  }, [cancelledDays]);

  const filterAndSortCancelledDays = (days) => {
    console.log(days);
    const yesterday = subDays(new Date(), 1);

    const filteredCancelledDays = days.filter((day) => {
      const cancelDate = addHours(parseISO(day.date), 3);
      console.log(cancelDate);
      return isAfter(cancelDate, yesterday);
    });

    const sortedCancelledDays = filteredCancelledDays.sort((a, b) => {
      const dateA = addHours(new Date(a.date), 3);
      const dateB = addHours(new Date(b.date), 3);
      console.log(dateA, dateB);
      return dateA - dateB;
    });

    return sortedCancelledDays;
  };

  const handleDelete = async () => {
    try {
      for (const selectedDay of selectedDays) {
        await deleteDayAdmin(selectedDay._id);
      }
      alert(
        `Volviste a habilitar los dias: ${selectedDays.map((day) =>
          format(parseISO(day.date), "dd/MM/yyyy")
        )}`
      );
      // Actualizar el estado de los días cancelados después de eliminarlos
      setCancelledDays((prevCancelledDays) =>
        prevCancelledDays.filter(
          (day) =>
            !selectedDays.some((selectedDay) => selectedDay._id === day._id)
        )
      );
      setSelectedDays([]);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSelectDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedDays.length === sortedCancelledDays.length) {
      setSelectedDays([]);
    } else {
      setSelectedDays(sortedCancelledDays.map((day) => day));
    }
  };

  const getDayOfWeek = (date) => {
    const dayOfWeek = getDay(parseISO(date));
    const daysOfWeek = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    return daysOfWeek[dayOfWeek];
  };

  const sortedCancelledDays = filterAndSortCancelledDays(cancelledDays);
  console.log(sortedCancelledDays);

  return (
    <>
      <div className="flex justify-center">
        <button
          className={`bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ${
            selectedDays.length === 0 ? "hidden" : ""
          }`}
          onClick={() => handleDelete()}
        >
          Eliminar Días Seleccionados
        </button>
      </div>
      {sortedCancelledDays.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-xl text-gray-700">No hay días cancelados</p>
        </div>
      ) : (
        <div className="flex justify-center mt-4">
          <table className=" border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-center">Fecha</th>
                <th className="text-center">Día</th>
                <th className="text-center">
                  <input
                    type="checkbox"
                    checked={selectedDays.length === sortedCancelledDays.length}
                    onChange={() => toggleSelectAll()}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedCancelledDays.map((day, index) => {
                const dateWithExtraDay = addDays(parseISO(day.date), 1); // Agregar un día a la fecha
                return (
                  <tr key={index} className="border-t border-gray-300">
                    <td className="px-4 py-4 text-center">
                      {format(dateWithExtraDay, "dd-MM-yyyy")}{" "}
                      {/* Usar la fecha ajustada */}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {getDayOfWeek(dateWithExtraDay)}
                    </td>
                    <td className="text-center px-4">
                      <input
                        type="checkbox"
                        checked={selectedDays.includes(day)}
                        onChange={() => toggleSelectDay(day)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ViewCancelledDays;
