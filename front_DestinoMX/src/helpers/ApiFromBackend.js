import axios from "axios"

export const apiFromBackend = axios.create({
  baseURL: "https://192.168.1.71:4000/", //////////////////////////////////////////
  withCredentials: true,
})
