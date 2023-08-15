import axios from "./axios";

//turnos

export const getTurnsByDateAdmin = async (date) =>
  axios.get(`/admin/turnos/${date}`);

export const deleteTurn = async (id) => axios.delete(`/admin/turnos/${id}`);

//dias
export const getCancelledDays = async () =>
  axios.get("/admin/cancelWorkingDays");
export const addCancelledDay = async () =>
  axios.post("/admin/cancelWorkingDays");
export const deleteCancelledDay = async (id) =>
  axios.delete(`/admin/cancelWorkingDays/${id}`);