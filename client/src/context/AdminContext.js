import { createContext, useContext, useEffect, useState } from "react";
import {
  addCancelledDay,
  deleteCancelledDay,
  deleteTurn,
  getAvailableHours,
  getCancelledDays,
  getTurnsByDateAdmin,
} from "../api/admin";
import { format } from "date-fns";

export const adminContext = createContext();

export const useAdmin = () => {
  const context = useContext(adminContext);
  if (!context) throw new Error("useAdmin Providar is missing");
  return context;
};

export const AdminProvider = ({ children }) => {
  //turns
  const [turns, setTurns] = useState([]);
  const [turnError, setTurnError] = useState();
  const [pickDay, setPickDay] = useState();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (pickDay) {
      (async () => {
        const turnsData = await getTurnsAdmin(pickDay);
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
      if (res.status === 204) setTurns(turns.filter((turn) => turn._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //days, refactorizar

  const [cancelledDays, setCancelledDays] = useState([]);
  const [dayError, setDayError] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //como puedo hacer para que esto se monte en el componente correspondiente sin tener que pasarle por las dependencias que estan en el contexto.

  useEffect(() => {
    (async () => {
      const daysData = await getDaysAdmin();
      if (Array.isArray(daysData)) {
        setDayError(null);
        setCancelledDays(daysData);
      } else {
        setCancelledDays([]);
        setDayError(daysData);
      }
    })();
  }, []);

  const getDaysAdmin = async () => {
    try {
      const res = await getCancelledDays();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addDayAdmin = async (dates) => {
    try {
      const res = await addCancelledDay(dates);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDayAdmin = async (id) => {
    try {
      await deleteCancelledDay(id);
    } catch (error) {
      console.log(error);
    }
  };

  const getUpdatedCancelledDays = async () => {
    try {
      const daysData = await getDaysAdmin();
      setCancelledDays(daysData);
    } catch (error) {
      console.log(error);
    }
  };

  //hours
  const [pickDayForHours, setPickDayForHours] = useState();
  const [hours, setHours] = useState([]);
  const [hourError, setHourError] = useState();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (pickDayForHours) {
      (async () => {
        const hoursData = await getHours(pickDayForHours);
        if (Array.isArray(hoursData)) {
          setHourError(null);
          setHours(hoursData);
        } else {
          setHours([]);
          setHourError(hoursData);
        }
      })();
    }
  }, [pickDayForHours]);

  const getHours = async (date) => {
    try {
      console.log(date);
       // Formatea la fecha como lo necesites para la solicitud
      const res = await getAvailableHours(date);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <adminContext.Provider
      value={{
        getTurnsAdmin,
        turns,
        setTurns,
        pickDay,
        setPickDay,
        deleteTurnByAdmin,
        turnError,
        notifications,
        setNotifications,
        cancelledDays,
        setCancelledDays,
        dayError,
        setStartDate,
        setEndDate,
        startDate,
        endDate,
        addDayAdmin,
        deleteDayAdmin,
        getDaysAdmin,
        getUpdatedCancelledDays,
        pickDayForHours,
        setPickDayForHours,
        hours,
        setHours,
        hourError,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
      }}
    >
      {children}
    </adminContext.Provider>
  );
};
