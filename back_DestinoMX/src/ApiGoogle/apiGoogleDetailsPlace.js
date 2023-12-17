import axios from "Axios";
import { Router } from "express";

const apiGoogleBaseUrl = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/place",
  withCredentials: true,
});

const getApiRoute = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/directions",
})

const apiKey = "AIzaSyBmZXrvgoPOwG1kNIHtND761VmqQSx4NXA";

export const routerApiDetails = Router();

//!Api para obtener los lugares cercanos de acuerdo con las preferencias
routerApiDetails.get("/api/nearBySearh", async (req, res) => {
  const { location, radius, type } = req.query;
  try {
    const response = await apiGoogleBaseUrl.get("/nearbysearch/json", {
      params: {
        location,
        radius,
        type,
        key: apiKey,
      },
    });
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

//!Api para obtener información del lugar de acuerdo con un place_id
routerApiDetails.get("/api/placeName", async (req, res) => {
  const { place_id } = req.query;
  try {
    const response = await apiGoogleBaseUrl.get("/details/json", {
      params: {
        place_id,
        key: apiKey,
        language: "es",
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

//!Api para obtener las fotos del lugar
routerApiDetails.get("/api/imgPlace", async (req, res)=> {
  const { maxwidth, photoreference } = req.query
  try {
    const response = await apiGoogleBaseUrl.get('/photo', {
      params: {
        maxwidth,
        photoreference,
        key: apiKey,
      },
      responseType: "arraybuffer",
    });
    res.status(200).send(response.data)
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

//!Api para obtener la ruta hacia algún lugar
routerApiDetails.get("/api/routePlace", async (req, res)=> {
  const { origin, destination } = req.query
  try {
    const response = await getApiRoute.get('/json', {
      params: {
        origin,
        destination,
        key: apiKey
      },
    });
    res.status(200).send(response.data)
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

//!Api para buscar lugares específicos
routerApiDetails.get("/api/searchPlace", async (req, res)=> {
  const { query } = req.query
  try {
    const response = await apiGoogleBaseUrl.get('/textsearch/json', {
      params: {
        query,
        key: apiKey
      },
    });
    res.status(200).send(response.data)
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});