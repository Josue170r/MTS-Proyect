import { mySqlConnection } from "../DB/DB_connection.js";
import { Router } from "express";

export const routerCalendario = Router();

// Consultar calendario
routerCalendario.get("/api/calendario", (req, res) => {
  if (!req.session.usuario) {
    res.status(403).send("Se debe inicar sesion.");
  } else {
    // Asumo que el ID del usuario está disponible en req.query.idUsuario
    const userId = req.session.usuario.idUsuario;

    const sqlQuery = "SELECT * FROM viajes WHERE idUsuario = ?";
    const queryParams = [userId];

    mySqlConnection.query(sqlQuery, queryParams, (err, rows, otro) => {
      if (!err) {
        res.status(200).json({
          exito: true,
          mensaje: "Consulta exitosa",
          info: rows,
        });
      } else {
        res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          error: err,
        });
      }
    });
  }
});
