import axios from "./axios";

//turnos

export const getTurnsByDateAdmin = async (date) =>
  axios.get(`/admin/turnos/${date}`);

export const deleteTurn = async (id) => axios.delete(`/admin/turnos/${id}`);

//dias
export const getCancelledDays = async () =>
  axios.get("/admin/cancelWorkingDays");
export const addCancelledDay = async (dates) =>
  axios.post("/admin/cancelWorkingDays", dates);
export const deleteCancelledDay = async (id) =>
  axios.delete(`/admin/cancelWorkingDay/${id}`);

  //hours
export const getAvailableHours = async (date) => axios.get(`/admin/availableHours/${date}`);
export const cancelAvailableHour = async (hours) => axios.post('/admin/cancelHours', hours);
export const getCancelledHours = async () => axios.get('/admin/cancelHours');
export const deleteCancelledHour = async (id) => axios.delete(`/admin/cancelHours/${id}`);