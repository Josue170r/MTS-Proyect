import axios from "axios"

export const apiFromBackend = axios.create({
  baseURL: "https://mts-destinomx.up.railway.app",
  withCredentials: true,
})
