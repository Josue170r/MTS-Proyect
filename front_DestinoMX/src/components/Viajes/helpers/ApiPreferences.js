import axios from "axios"

export const getApiPreferences = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/place/nearbysearch",
})
