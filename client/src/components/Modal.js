import React from "react";
import Calendar from "./Calendar";
import Turnos from "./TurnForm";

function Modal({
  selectedTime,
  handleSelectedTime,
  selectedDay,
  handleSelectedDay,
}) {
  return (
    <>
      <button
        type="button"
        className="inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-500 hover:shadow-lg"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalFullscreen"
      >
        Elegi tu turno
      </button>

      <div
        className="modal fade fixed top-0 bottom-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="exampleModalFullscreen"
        tabIndex="-1"
        aria-labelledby="exampleModalFullscreenLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex items-center text-center justify-center p-4 border-b border-gray-200 rounded-t-md">
              <h1
                className="text-xl text-center font-medium leading-normal text-gray-800"
                id="exampleModalFullscreenLabel"
              >
                Elegi un turno!
              </h1>
            </div>
            <div>
              <Calendar
                selectedDay={selectedDay}
                handleSelectedDay={handleSelectedDay}
                handleSelectedTime={handleSelectedTime}
              />
            </div>
            <Turnos
              selectedTime={selectedTime}
              handleSelectedTime={handleSelectedTime}
              selectedDay={selectedDay}
            />
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
