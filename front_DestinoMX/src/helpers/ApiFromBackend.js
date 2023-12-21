import axios from "axios"

export const apiFromBackend = axios.create({
  // baseURL: "https://mts-destinomx.up.railway.app",
  baseURL: "http://localhost:4000",
  withCredentials: true,
})
