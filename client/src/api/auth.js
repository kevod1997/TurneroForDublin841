import axios from "./axios";


export const loginRequest = (admin) => axios.post(`/login`, admin, { withCredentials: true });

export const verifyTokenRequest = () => axios.get('/verify');

export const logoutRequest = () => axios.post('/logout');