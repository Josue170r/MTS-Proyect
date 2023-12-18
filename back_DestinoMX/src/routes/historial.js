import { mySqlConnection } from "../DB/DB_connection.js";
import { Router } from "express";

export const routerHistorial = Router();

// Obtener historial del usuario
routerHistorial.get("/api/historial", async (req, res) => {
  if (!req.session.usuario)
    res.status(403).json({
      exito: false,
      mensaje: "Se debe iniciar sesión",
    });
  else {
    const getHistoryQuery = `SELECT * FROM historial WHERE idUsuario = ?;`;
    const idUsuario = req.session.usuario.idUsuario;

    mySqlConnection.query(getHistoryQuery, [idUsuario], (err, rows, fields) => {
      if (err)
        res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err,
        });
      else if (rows.length === 0)
        res.status(200).json({
          exito: true,
          mensaje: "No tienes historial.",
        });
      else
        res.status(200).json({
          exito: true,
          info: rows,
        });
    });
  }
});

// Agregar un sitio a favoritos
routerHistorial.post("/api/historial", async (req, res) => {
  if (!req.session.usuario)
    res.status(403).json({
      exito: false,
      mensaje: "Se debe iniciar sesión",
    });
  else {
    const { idPlaceLugar } = req.body;
    const idUsuario = req.session.usuario.idUsuario;
    const postHistoryQuery = `INSERT INTO historial (idPlaceLugar, idUsuario) values ("${idPlaceLugar}", "${idUsuario}");`;
    mySqlConnection.query(postHistoryQuery, (err, rows, fields) => {
      if (err)
        res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err,
        });
      else
        res.status(200).json({
          exito: true,
          mensaje: "Sitio añadido al historial con éxito.",
          info: rows,
        });
    });
  }
});

// Eliminar un sitio de favoritos
routerHistorial.delete("/api/historial", (req, res) => {
  if (!req.session.usuario){
    res.status(403).json({ exito: false, mensaje: "Se debe inicar sesion." });
  }
  else {
    const userExistsQuery = `SELECT * FROM usuario WHERE idUsuario = ?;`;
    const { idPlaceLugar } = req.query;
    const idUsuario = req.session.usuario.idUsuario;
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
    const query = `DELETE FROM historial WHERE idPlaceLugar = ?;`;
    
    mySqlConnection.query(query, [idPlaceLugar], (err, rows, fields) => {
      if(err)
        res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err
        });
        else if (rows.length === 0)
        res
        .status(500)
        .json({ exito: false, mensaje: "El sitio no está en favoritos" });
    else {
      // Eliminar el sitio de favoritos
      const query = `DELETE FROM historial WHERE idPlaceLugar = ?;`;
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
              mensaje: "Sitio eliminado de historial con éxito",
            });
        }
      );
    }
  });
}
});
}
});
