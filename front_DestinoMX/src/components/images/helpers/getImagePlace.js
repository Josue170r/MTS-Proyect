import axios from "axios"

export const getImgPlaceApi = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/place",
})
