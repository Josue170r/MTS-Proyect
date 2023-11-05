import axios from "axios"

export const getWeatherPlace = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
})
