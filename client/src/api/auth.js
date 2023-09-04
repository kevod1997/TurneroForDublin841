import axios from "./axios";

export const loginRequest = (admin) => axios.post("/login", admin);

export const verifyTokenRequest = () => {
  return axios.get("/verify", {
    withCredentials: true, // Habilita el envío de cookies
    headers: { 'Content-Type': 'application/json' }
  });
};

export const logoutRequest = () => axios.post("/logout");
