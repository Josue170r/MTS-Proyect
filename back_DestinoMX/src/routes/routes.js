import { mySqlConnection } from "../database.js";
import { Router } from "express";
export const router = Router();

// Routes
router.get("/api/login", (req, res) => {
  mySqlConnection.query('SELECT `Usuario` from `Usuario`', (err, rows, fields) => {
    if(!err)
      console.log(rows)
    else
      console.log(err);
  })
});
