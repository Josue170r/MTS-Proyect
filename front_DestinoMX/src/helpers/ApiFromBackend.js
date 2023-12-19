import axios from "axios"

export const apiFromBackend = axios.create({
  baseURL: "https://backend-mts.up.railway.app",
  withCredentials: true,
})
