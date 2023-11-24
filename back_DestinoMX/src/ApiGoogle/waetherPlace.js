import axios from "Axios";
import { Router } from "express";

const getApiWaether = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  withCredentials: true,
});

const apiKey2 = "a4e3d3b9019328f729700ec96a75dc66";

export const routerApiWeather = Router();

routerApiWeather.get("/api/Weather", async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await getApiWaether.get("/weather", {
      params: {
        lat,
        lon,
        appid: apiKey2,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});
