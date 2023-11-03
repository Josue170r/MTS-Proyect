import axios from "axios"

export const getRouteApi = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/directions/json?",
})
