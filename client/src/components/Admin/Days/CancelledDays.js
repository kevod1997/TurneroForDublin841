import React, { useState } from "react";
import ViewCancelledDays from "./ViewCancelledDays";
import AddCancelledDays from "./AddCancelledDays";

const CancelledDays = () => {
  const [showCancelledDays, setShowCancelledDays] = useState(false);

  return (
    <div className="flex flex-col items-center mt-8 mb-4">
      <div className="mb-4">
        <button
          onClick={() => setShowCancelledDays(false)}
          className={`px-4 py-2 mr-2 ${
            showCancelledDays ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded`}
        >
          Cancelar Dias
        </button>
        <button
          onClick={() => setShowCancelledDays(true)}
          className={`px-4 py-2 ${
            showCancelledDays ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300"
          } text-white rounded`}
        >
          Días Cancelados
        </button>
      </div>
      <div className="mt-4">
        {showCancelledDays ? <ViewCancelledDays/> : <AddCancelledDays /> }
      </div>
    </div>
  );
};



export default CancelledDays;
