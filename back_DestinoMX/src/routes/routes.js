import { mySqlConnection } from "../database.js";
import { Router, json } from "express";
export const router = Router();

// Routes
router.get("/api/ConsultarCalendario", (req, res) => {
  mySqlConnection.query("select idUsuario from usuario",(err,results,otro)=>{
    if(!err){
      console.log(results);
      res.json(results)
    }
    else {
      console.log(err);
      res.json(err)
    }
  })
  
  
});


