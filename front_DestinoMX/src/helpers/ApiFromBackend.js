import axios from "axios"

export const apiFromBackend = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
})
