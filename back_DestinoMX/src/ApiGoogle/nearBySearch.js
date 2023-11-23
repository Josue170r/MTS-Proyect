import axios from "Axios"
import { Router } from "express"

const getApiPreferences = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/place/nearbysearch",
  withCredentials: true,
})

const apiKey = "AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70"


export const routerApi = Router()

routerApi.get("/api/nearBySearh", async (req, res)=> {
  const { location, radius, type } = req.query
  try {
    const response = await getApiPreferences.get('/json', {
      params: {
        location,
        radius,
        type,
        key: apiKey
      },
    });
    console.log(response.data)
    res.status(200).json(response.data)
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});