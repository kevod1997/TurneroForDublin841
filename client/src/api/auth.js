import axios from "./axios";


export const loginRequest = (admin) => axios.post('/login', admin);

export const verifyTokenRequest = () => axios.get('/verify', {
    withCredentials: true, // Habilita el envío de cookies
  });

export const logoutRequest = () => axios.post('/logout');