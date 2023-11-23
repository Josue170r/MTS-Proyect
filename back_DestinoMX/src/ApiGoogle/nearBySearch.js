import { Router } from "express";

import axios from "axios";

export const routerApi = Router();

routerApi.get("/api/nearBySearh",async (res,req)=>{
    console.log(req.query);
    // const { location, radius, type, key } = req.body;
    
    console.log("llega");
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?', {
      params: {
        location,
        radius,
        type,
        key, 
      },
    });
    res.json(response.data);
});



