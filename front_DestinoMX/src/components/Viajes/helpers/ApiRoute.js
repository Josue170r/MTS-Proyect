import axios from "axios"

export const getApiRoute = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/directions/json",
})
