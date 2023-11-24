import axios from "Axios"
import { Router } from "express"

const getApiImg = axios.create({
    baseURL: "https://maps.googleapis.com/maps/api/place",
    withCredentials: true,
  })

  const apiKey = "AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70"

  export const routerApiImg = Router()

  routerApiImg.get("/api/imgPlace", async (req, res)=> {
  const { maxwidth, photoreference } = req.query
  try {
    const response = await getApiImg.get('/photo', {
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