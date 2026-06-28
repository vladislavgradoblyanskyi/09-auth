import axios from "axios";
const BASE_URL = "https://09-auth-gray-psi.vercel.app//api"

export const nextServer = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});