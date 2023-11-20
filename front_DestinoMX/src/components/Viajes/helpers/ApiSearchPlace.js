import axios from "axios"

export const getSearchPlaceApi = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/place/textsearch/json",
})
 