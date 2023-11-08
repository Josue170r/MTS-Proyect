import axios from "axios"

export const getNameApi = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/place/details",
})
