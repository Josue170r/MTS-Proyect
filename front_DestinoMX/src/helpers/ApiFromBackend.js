import axios from "axios"

export const apiFromBackend = axios.create({
  baseURL: "https://192.168.66.100:4000/", //////////////////////////////////////////
  withCredentials: true,
})
