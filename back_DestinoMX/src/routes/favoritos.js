import { mySqlConnection } from "../DB/DB_connection.js";
import { Router } from "express";

export const routerFavoritos = Router();

// Agregar un nuevo sitio turistico a favoritos
// Recibe:
// idPlaceLugar
routerFavoritos.post("/api/favoritos", (req, res) => {
  if (!req.session.usuario) {
    res.status(403).json({ exito: false, mensaje: "Se debe iniciar sesión." });
  } else {
    const { idPlaceLugar } = req.body;
    const idUsuario = req.session.usuario.idUsuario;
    const userExistsQuery = `SELECT * FROM usuario WHERE idUsuario = ?;`;

    // Verificar si el usuario existe
    mySqlConnection.query(userExistsQuery, [idUsuario], (err, rows, fields) => {
      if (err)
        res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err: err,
        });
      else if (rows.length === 0)
        res.status(404).json({ exito: false, mensaje: "El usuario no existe" });
      // Verificar si el sitio ya está en favoritos
      else {
        const query = `SELECT * FROM favoritos WHERE idPlaceLugar = ?;`;
        mySqlConnection.query(query, [idPlaceLugar], (err, rows, fields) => {
          if (err)
            res.status(500).json({
              exito: false,
              mensaje: "Error en la consulta",
              err: err,
            });
          else if (rows.length > 0)
            res
              .status(409)
              .json({ exito: false, mensaje: "El viaje ya está en favoritos" });
          // Insertar el sitio a favoritos
          else {
            const query = `INSERT INTO favoritos (idPlaceLugar, idUsuario) values ("${idPlaceLugar}", "${idUsuario}")`;
            mySqlConnection.query(query, (err, rows, fields) => {
              if (err)
                res.status(500).json({
                  exito: false,
                  mensaje: "Error en la consulta",
                  err: err,
                });
              else
                res.status(200).json({
                  exito: true,
                  mensaje: "Sitio añadido a favoritos con éxito",
                });
            });
          }
        });
      }
    });
  }
});

// Eliminar un sitio turistico de favoritos
// Recibe:
// idPlaceLugar
routerFavoritos.delete("/api/favoritos", (req, res) => {
  if (!req.session.usuario) {
    res.status(403).json({ exito: false, mensaje: "Se debe iniciar sesión." });
  } else {
    const userExistsQuery = `SELECT * FROM usuario WHERE idUsuario = ?;`;
    const { idPlaceLugar } = req.query;

    const idUsuario = req.session.usuario.idUsuario;
    // Verificar si el usuario existe
    mySqlConnection.query(userExistsQuery, [idUsuario], (err, rows, fields) => {
      if (err)
        res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err: err,
        });
      else if (rows.length === 0)
        res.status(404).json({ exito: false, mensaje: "El usuario no existe" });
      else {
        // Verificar si el sitio está en favoritos
        const query = `SELECT * FROM favoritos WHERE idPlaceLugar = ?;`;
        mySqlConnection.query(query, [idPlaceLugar], (err, rows, fields) => {
          if (err)
            res.status(500).json({
              exito: false,
              mensaje: "Error en la consulta",
              err: err,
            });
          else if (rows.length === 0)
            res
              .status(500)
              .json({ exito: false, mensaje: "El sitio no está en favoritos" });
          else {
            // Eliminar el sitio de favoritos
            const query = `DELETE FROM favoritos WHERE idPlaceLugar = ?;`;
            mySqlConnection.query(
              query,
              [idPlaceLugar],
              (err, rows, fields) => {
                if (err)
                  res.status(500).json({
                    exito: false,
                    mensaje: "Error en la consulta",
                    err: err,
                  });
                else
                  res.status(200).json({
                    exito: true,
                    mensaje: "Sitio eliminado de favoritos con éxito",
                  });
              }
            );
          }
        });
      }
    });
  }
});

// Obtener los favoritos del usuario
routerFavoritos.get("/api/favoritos", async (req, res) => {
  if (!req.session.usuario) {
    res.status(403).json({ exito: false, mensaje: "Se debe inicar sesion." });
  } else {
    const idUsuario = req.session.usuario.idUsuario;
    const userExistsQuery = `SELECT * FROM usuario WHERE idUsuario = ?;`;

    // Verificar que el usuario existe
    mySqlConnection.query(userExistsQuery, [idUsuario], (err, rows, field) => {
      if (err)
        res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err: err,
        });
      else if (rows.length === 0)
        res.status(404).json({ exito: false, mensaje: "El usuario no existe" });
      // Obtener los favoritos si se encontró el usuario
      else {
        const getFavsQuery = `SELECT (idPlaceLugar) FROM favoritos WHERE idUsuario = ?;`;
        mySqlConnection.query(getFavsQuery, [idUsuario], (err, rows, field) => {
          if (err)
            res.status(500).json({
              exito: false,
              mensaje: "Error en la consulta",
              err: err,
            });
          else if (rows.length === 0)
            res
              .status(200)
              .json({ exito: true, mensaje: "No tienes favoritos." });
          else res.status(200).json({ exito: true, info: rows });
        });
      }
    });
  }
});
