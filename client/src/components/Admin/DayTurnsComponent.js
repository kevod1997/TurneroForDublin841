import React from 'react'
import { useAdmin } from '../../context/AdminContext'
import Calendar from './Calendar'
import { parse } from 'date-fns'

const DayTurnsComponent = () => {

  const {pickDay, setPickDay, turns, setTurns, deleteTurnByAdmin, turnError} = useAdmin()

  const sortedTurns = turns.slice().sort((a, b) => {
    const timeA = parse(a.hour, "HH:mm", new Date());
    const timeB = parse(b.hour, "HH:mm", new Date());
    return timeA - timeB;
  });

  const handleDeleteConfirmation = async (turn) => {
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas borrar el turno de las ${turn.hour}?`
    );
  
    if (confirmed) {
    await  deleteTurnByAdmin(turn._id);
      alert(`Borraste el turno de las ${turn.hour}`);
    }
  };
  console.log(turns);

  return (
    <>
<div className="w-full overflow-x-auto mb-4">
  <Calendar pickDay={pickDay} setPickDay={setPickDay} turns={turns} setTurns={setTurns} />
  {/* <p className="text-2xl font-bold my-4 text-center">Turnos del día {pickDay ? pickDay.toLocaleDateString() : ""}</p> */}
  {turnError && <p className="text-red-500 text-center mt-4"> {turnError.message}</p>}
 {turns.length > 0 &&  <div className="w-full mt-4 px-1">
    <table className="table-fixed w-full mx-auto">
      <thead>
        <tr>
          <th className="w-1/6 px-2 sm:px-4 py-1 text-sm">Hora</th>
          <th className="w-1/6 px-2 sm:px-4 py-1 text-sm">Nombre</th>
          <th className="w-1/6 px-2 sm:px-4 py-1 text-sm">Teléfono</th>
          <th className="w-1/6 px-2 sm:px-4 py-1 text-sm">Corte</th>
          <th className="w-[5%] px-2 sm:px-4 py-1 text-sm"></th>
        </tr>
      </thead>
      <tbody>
        {sortedTurns.map((turn, index) => (
          <tr key={index}>
            <td className="border px-2 sm:px-4 py-1 text-sm">{turn.hour}</td>
            <td className="border px-2 sm:px-4 py-1 text-sm">{turn.name}</td>
            <td className=" border px-1 sm:px-4 py-1 text-sm">{turn.phone}</td>
            <td className="border px-2 sm:px-4  py-1 text-sm">{turn.service}</td>
            <td className="border px-2 sm:px-4 py-1 text-sm hover:bg-red-600">
              <button className=''
              onClick={()=> handleDeleteConfirmation(turn)}>
                X
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>}
</div>



    </>
  )
}

export default DayTurnsComponent