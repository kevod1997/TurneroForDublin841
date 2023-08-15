import { createContext, useContext, useEffect, useState } from "react";
import { deleteTurn, getTurnsByDateAdmin } from "../api/admin";
import { format } from "date-fns";

export const adminContext = createContext();

export const useAdmin = () => {
  const context = useContext(adminContext);
  if (!context) throw new Error("useAdmin Providar is missing");
  return context;
};

export const AdminProvider = ({ children }) => {
  const [turns, setTurns] = useState([]);
  const [turnError, setTurnError] = useState();
  const [pickDay, setPickDay] = useState();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (pickDay) {
      (async () => {
        const turnsData = await getTurnsAdmin(pickDay);
        console.log(turnsData);
        if (Array.isArray(turnsData)) {
          setTurnError(null);
          setTurns(turnsData);
        } else {
          setTurns([]);
          setTurnError(turnsData);
        }
      })();
    }
  }, [pickDay]);


  const getTurnsAdmin = async (date) => {
    try {
      const formattedDate = format(date, "yyyy-MM-dd"); // Formatea la fecha como lo necesites para la solicitud
      const res = await getTurnsByDateAdmin(formattedDate);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTurnByAdmin = async (id) => {
    try {
      const res = await deleteTurn(id);
      if(res.status === 204) setTurns(turns.filter(turn => turn._id !== id))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <adminContext.Provider
      value={{ getTurnsAdmin, turns, setTurns, pickDay, setPickDay, deleteTurnByAdmin, turnError, notifications, setNotifications }}
    >
      {children}
    </adminContext.Provider>
  );
};
