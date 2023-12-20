import { mySqlConnection } from "../DB/DB_connection.js";
import { Router } from "express";

export const routerSitios = Router();

// Obtener todos los sitios de un viaje especifico
routerSitios.get("/api/sitios", (req, res) => {
  if (!req.session.usuario)
    res.status(403).json({
      exito: false,
      mensaje: "Se debe iniciar sesión",
    });
  else {
    const getSitiosQuery = `SELECT * FROM lugaresdeviajes WHERE idViajes = ?`;
    const { idViajes } = req.query;
    mySqlConnection.query(getSitiosQuery, [idViajes], (err, rows, fields) => {
      if (err)
        res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err,
        });
      else if (rows.length === 0) {
        res.status(200).json({
          exito: true,
          mensaje: "No tienes sitios agregados",
        });
      } else {
        res.status(200).json({
          exito: true,
          mensaje: "Datos recopilados con éxito",
          info: rows,
        });
      }
    });
  }
});

// Añadir sitios a un viaje a través del idViajes, necesita el placeID
routerSitios.post("/api/sitios", (req, res) => {
  if (!req.session.usuario)
    res.status(403).json({
      exito: false,
      mensaje: "Se debe iniciar sesión",
    });
  else {
    const {
      placeID,
      idViajes,
      fechaEspecifica,
      nombrePlaces,
      imagePlaces,
    } = req.body;
    const checkIDQuery = `SELECT * FROM viajes WHERE idViajes = "${idViajes}"`;
    mySqlConnection.query(checkIDQuery, (err, rows, fields) => {
      if (err)
        res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err,
        });
      else if (rows.length === 0) {
        res.status(404).json({
          exito: false,
          mensaje: "No existe el viaje.",
          err,
        });
      } else {
        const verifyExistingPlaceQuery = `
          SELECT *
          FROM lugaresdeviajes
          WHERE placeID = "${placeID}"
            AND fechaEspecifica = "${fechaEspecifica}"
            AND idViajes = ${idViajes}
        `;
        mySqlConnection.query(
          verifyExistingPlaceQuery,
          [placeID, idViajes],
          (err, rows, fields) => {
            if (err)
              res.status(500).json({
                exito: false,
                mensaje: "Error en la consulta",
                err,
              });
            else if (rows.length > 0)
              res.status(409).json({
                exito: false,
                mensaje: `Este sitio ya se encuentra en el día ${fechaEspecifica}`,
                info: rows,
              });
            else {
              const addPlaceQuery = `
                INSERT INTO lugaresdeviajes (idViajes, fechaEspecifica, nombrePlaces, imagePlaces, placeID)
                VALUES (${idViajes}, "${fechaEspecifica}", "${nombrePlaces}", "${imagePlaces}", "${placeID}");
              `;
              mySqlConnection.query(addPlaceQuery, (err, rows, fields) => {
                if (err)
                  res.status(500).json({
                    exito: false,
                    mensaje: "Error en la consulta",
                    err,
                  });
                else {
                  res.status(200).json({
                    exito: true,
                    mensaje: "Sitio añadido con éxito a tu viaje",
                  });
                }
              });
            }
          }
        );
      }
    });
  }
});

// Actualizar un viaje a través del idViajes y del placeID
routerSitios.put("/api/sitios", (req, res) => {
  if (!req.session.usuario)
    res.status(403).json({
      exito: false,
      mensaje: "Se debe iniciar sesión",
    });
  else {
    const {
      fechaEspecifica,
      nombrePlaces,
      imagePlaces,
      placeID,
      idViajes
    } = req.body;
    const verifyExistingTripQuery = `SELECT * FROM lugaresdeviajes WHERE idViajes = ?`;
    mySqlConnection.query(
      verifyExistingTripQuery,
      [idViajes],
      (err, rows, fields) => {
        if (err)
          res.status(500).json({
            exito: false,
            mensaje: "Error en la consulta",
            err,
          });
        else if (rows.length === 0) {
          res.status(404).json({
            exito: false,
            mensaje: "No existe el viaje.",
            err,
          });
        } else {
          const updateTripQuery = `
            UPDATE lugaresdeviajes
            SET fechaEspecifica= "${fechaEspecifica}", nombrePlaces="${nombrePlaces}", imagePlaces="${imagePlaces}"
            WHERE placeID="${placeID}" AND idViajes="${idViajes}";
          `;
          mySqlConnection.query(updateTripQuery, (err, rows, fields) => {
            if (err)
              res.status(500).json({
                exito: false,
                mensaje: "Error en la consulta",
                err,
              });
            else {
              res.status(200).json({
                exito: true,
                mensaje: "Sitio modificado con éxito a tu viaje",
              });
            }
          });
        }
      }
    );
  }
});


routerSitios.delete("/api/sitios", (req, res) => {
  if (!req.session.usuario)
    res.status(403).json({
      exito: false,
      mensaje: "Se debe iniciar sesión",
    });
  else {
    const { placeID, fechaEspecifica, idViajes } = req.query;
    const deleteSitio = `
      DELETE FROM lugaresdeviajes
      WHERE placeID = "${placeID}" AND fechaEspecifica="${fechaEspecifica}" AND idViajes="${idViajes}";
    `;
    mySqlConnection.query(deleteSitio, (err, rows, fields) => {
      if (err)
        res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err,
        });
      else {
        res.status(200).json({
          exito: true,
          mensaje: "Sitio eliminado con éxito",
        });
      }
    });
  }
});
