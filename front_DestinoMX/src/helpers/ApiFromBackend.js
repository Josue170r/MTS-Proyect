import axios from "axios"

export const apiFromBackend = axios.create({
  baseURL: "https://192.168.43.164:4000/", /////////////////////////////////////////
  withCredentials: true,
})
