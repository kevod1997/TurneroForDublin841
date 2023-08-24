import React, { useEffect, useState } from "react";
import { useAdmin } from "../../../context/AdminContext";
import { parseISO, subDays } from "date-fns";
import { format } from "date-fns";
import { isAfter } from "date-fns";

const ViewHours = () => {
  const { cancelledHours, setCancelledHours, deleteCancelledHourAdmin, getUpdatedCancelledHours } =
    useAdmin();
  const [selectedHours, setSelectedHours] = useState([]);

  useEffect(() => {
    console.log('render');
    getUpdatedCancelledHours();
    }, []);


  const filterAndSortCancelledHours = (days) => {
    const yesterday = subDays(new Date(), 1);

    const filteredCancelledDays = days.filter((day) => {
      const cancelDate = parseISO(day.date);
      return isAfter(cancelDate, yesterday);
    });

    const sortedCancelledDays = filteredCancelledDays.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    return sortedCancelledDays;
  };

  const sortedCancelledHours = filterAndSortCancelledHours(cancelledHours);

  const handleDelete = async () => {
    try {
      for (const selectedHour of selectedHours) {
        await deleteCancelledHourAdmin(selectedHour._id);
      }
      alert(
        `Se habilitaron los siguientes horarios: \n ${selectedHours.map(
          (hour) =>
            format(parseISO(hour.date), "dd/MM") +
            " " +
            hour.startHour +
            " - " +
            hour.endHour +
            "\n"
        )}`
      );
      setCancelledHours((prevCancelledHours) =>
        prevCancelledHours.filter(
          (hour) =>
            !selectedHours.some((selectedHour) => selectedHour._id === hour._id)
        )
      );
      setSelectedHours([]);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSelectHour = (hour) => {
    if (selectedHours.includes(hour)) {
      setSelectedHours(
        selectedHours.filter((selectedHour) => selectedHour !== hour)
      );
    } else {
      setSelectedHours([...selectedHours, hour]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedHours.length === sortedCancelledHours.length) {
      setSelectedHours([]);
    } else {
      setSelectedHours(sortedCancelledHours.map((hour) => hour));
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded bg-gray-100">
      <div className="flex justify-center">
        <button
          className={`bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 ${
            selectedHours.length === 0 ? "hidden" : ""
          }`}
          onClick={() => handleDelete()}
        >
          Habilitar horas selecionadas
        </button>
      </div>
      {sortedCancelledHours.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-xl text-gray-700">No hay horas canceladas</p>
        </div>
      ) : (
        <div className="flex justify-center mt-4">
          <table className=" border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-center">Fecha</th>
                <th className="text-center">Inicio</th>
                <th className="text-center">Fin</th>
                <th className="text-center">
                  <input
                    type="checkbox"
                    checked={
                      selectedHours.length === sortedCancelledHours.length
                    }
                    onChange={() => toggleSelectAll()}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedCancelledHours.map((day, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-4 text-center">
                    {format(parseISO(day.date), "dd-MM")}
                  </td>
                  <td className="px-4 py-4 text-center">{day.startHour}</td>
                  <td className="px-4 py-4 text-center">{day.endHour}</td>
                  <td className="text-center px-4">
                    <input
                      type="checkbox"
                      checked={selectedHours.includes(day)}
                      onChange={() => toggleSelectHour(day)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewHours;
