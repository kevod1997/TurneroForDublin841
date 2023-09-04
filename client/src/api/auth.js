import axios from "./axios";

export const loginRequest = (admin) => axios.post("/login", admin);

export const verifyTokenRequest = (token) => {
  return axios.get("/verify", {
    withCredentials: true, // Habilita el envío de cookies
    headers: {
      Authorization: `Bearer ${token}`, // Donde 'token' es el token JWT
    },
  });
};

export const logoutRequest = () => axios.post("/logout");
