import { VARCHAR } from "mysql/lib/protocol/constants/types.js";
import { mySqlConnection } from "../DB/DB_connection.js";
import { Router } from "express";

export const routerViajes = Router();

// Funciona OK
routerViajes.get("/api/viaje", (req, res) => {
  // Verificar que la sesion este iniciada.
  if (!req.session.usuario) {
    res.status(403).json({ exito: false, mensaje: "Se debe iniciar sesion." });
  } else {
    mySqlConnection.query(
      `SELECT colorPlantilla,descripcionViaje,diaFinal,diaInicio,nombreMiViaje FROM viajes WHERE idUsuario = ${req.session.usuario.idUsuario};`,
      (err, rows, fields) => {
        if (err) {
          res.status(500).json({
            exito: false,
            mensaje: "Error en la consulta",
            err: err,
          });
        } else if (rows.length === 0) {
          res
            .status(200)
            .json({ exito: true, mensaje: "¡Aún no tienes viajes!" });
        } else {
          res.status(200).json({ exito: true, info: [...rows] });
        }
      }
    );
  }
});

// Crear un nuevo viaje
// Recibe:
// nombreMiViaje, diaInicio, diaFinal, descripcionViaje, colorPlantilla
// Funciona OK
routerViajes.post("/api/viaje", (req, res) => {
  // Verificar que la sesion este iniciada.
  if (!req.session.usuario) {
    res.status(403).json({ exito: false, mensaje: "Se debe inicar sesion." });
  } else {
    // Extrayendo el id del usuario de la sesion.
    const idUsuario = req.session.usuario.idUsuario;

    // Ver que el usuario exista en la BD.
    mySqlConnection.query(
      `SELECT * FROM usuario WHERE idUsuario = ${idUsuario};`,
      (err, rows, fields) => {
        if (err) {
          res.status(500).json({
            exito: false,
            mensaje: "Error en la consulta",
            err,
          });
        } else if (rows.length === 0) {
          res
            .status(404)
            .json({ exito: false, mensaje: "Usuario inexistente." });
        } else {
          // Eliminar espacios extra del nombre del viaje.
          const nombreMiViajeSQL = req.body.nombreMiViaje.trim();

          // Ver si existe un viaje con el mismo nombre.
          mySqlConnection.query(
            `SELECT * FROM viajes WHERE nombreMiViaje = "${nombreMiViajeSQL}" AND idUsuario = "${idUsuario}"`,
            (err, rows, fields) => {
              if (err) {
                res.status(500).json({
                  exito: false,
                  mensaje: "Error en la consulta",
                  err: err,
                });
              } else if (rows.length > 0) {
                res.status(409).send({
                  exito: false,
                  mensaje: "Ya existe un viaje con ese nombre.",
                });
              } else {
                const diaInicio = new Date(req.body.diaInicio);
                const diaFinal = new Date(req.body.diaFinal);

                const diaInicioSQL = diaInicio.toISOString().slice(0, 10);
                const diaFinalSQL = diaFinal.toISOString().slice(0, 10);

                // Registrar el viaje
                mySqlConnection.query(
                  `INSERT INTO viajes (nombreMiViaje,descripcionViaje,diaInicio,diaFinal,colorPlantilla,idUsuario) VALUES ("${nombreMiViajeSQL}","${req.body.descripcionViaje}","${diaInicioSQL}","${diaFinalSQL}","${req.body.colorPlantilla}","${idUsuario}");`,
                  (err, rows, fields) => {
                    if (err) {
                      res.status(500).json({
                        exito: false,
                        mensaje: "Error en la consulta",
                        err: err,
                      });
                    } else {
                      res.status(200).json({
                        exito: false,
                        mensaje: "Viaje agregado con exito.",
                        rows,
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
});

// Editar viaje
// Recibe:
// nombreMiViaje, diaInicio, diaFinal, descripcionViaje, colorPlantilla, idViajes
// Funciona OK
routerViajes.put("/api/viaje", (req, res) => {
  if (!req.session.usuario) {
    res.status(403).send({ exito: false, mensaje: "Se debe inicar sesion." });
  } else {
    const consultaUsuario = `SELECT * FROM usuario WHERE idUsuario = ${req.session.usuario.idUsuario};`;

    mySqlConnection.query(consultaUsuario, (err, rows, fields) => {
      if (err)
        res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err: err,
        });
      else if (rows.length === 0)
        res.status(404).send({ exito: false, mensaje: "Usuario inexistente." });
      else {
        // Ver que si exista un viaje con ese idViajes.
        const consultaIDViaje = `SELECT (idViajes) FROM viajes WHERE idViajes = ${req.body.idViajes};`;
        mySqlConnection.query(consultaIDViaje, (err, rows, fields) => {
          if (err) {
            res.status(500).json({
              exito: false,
              mensaje: "Error en la consulta",
              err: err,
            });
          } else if (rows.length === 0) {
            res
              .status(404)
              .json({ exito: false, mensaje: "Viaje inexistente." });
          } else {
            const nombreViajeSQL = req.body.nombreMiViaje.trim();
            const consultaNombreViaje = `SELECT * FROM viajes WHERE idViajes = ${req.body.idViajes} AND nombreMiViaje = "${nombreViajeSQL}"`;
            mySqlConnection.query(consultaNombreViaje, (err, rows, fields) => {
              if (err) {
                res.status(500).json({
                  exito: false,
                  mensaje: "Error en la consulta",
                  err: err,
                });
              } else if (rows.length > 0)
                res.status(409).json({
                  exito: false,
                  mensaje: "Ya existe un viaje con ese nombre.",
                });
              else {
                const diaInicio = new Date(req.body.diaInicio);
                const diaFinal = new Date(req.body.diaFinal);

                const diaInicioSQL = diaInicio.toISOString().slice(0, 10);
                const diaFinalSQL = diaFinal.toISOString().slice(0, 10);

                const {
                  idViajes,
                  nombreMiViaje,
                  descripcionViaje,
                  colorPlantilla,
                } = req.body;
                const consultaActualizarViaje = `UPDATE viajes SET nombreMiViaje = "${nombreMiViaje}", descripcionViaje = "${descripcionViaje}", diaInicio = '${diaInicioSQL}', diaFinal = '${diaFinalSQL}', colorPlantilla = '${colorPlantilla}' where idViajes = ${idViajes};`;

                mySqlConnection.query(
                  consultaActualizarViaje,
                  (err, rows, fields) => {
                    if (err)
                      res.status(500).json({
                        exito: false,
                        mensaje: "Error en la consulta",
                        err: err,
                      });
                    else {
                      res.status(200).json({
                        exito: true,
                        mensaje: "Viaje actualizado con exito.",
                        rows,
                      });
                    }
                  }
                );
              }
            });
          }
        });
      }
    });
  }
});

// Eliminar viaje
// Recibe idViajes
routerViajes.delete("/api/viaje", (req, res) => {
  if (!req.session.usuario) {
    res.status(403).json({ exito: false, mensaje: "Se debe inicar sesion." });
  } else {
    const consultaDeEliminacion = `DELETE FROM viajes WHERE idViajes = ${req.body.idViajes}`;
    mySqlConnection.query(consultaDeEliminacion, (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err,
        });
      } else {
        res
          .status(200)
          .json({ exito: true, mensaje: "Viaje eliminado correctamente." });
      }
    });
  }
});

routerViajes.get("/api/sitios", (req, res) => {
  if (!req.session.usuario)
    res.status(403).json({
      exito: false,
      mensaje: "Se debe iniciar sesión",
    });
  else {
    const getViajesQuery = `SELECT idPlacesLugar, fechaEspecifica FROM lugaresdeviajes WHERE idViajes = ?`;
    const { idViajes } = req.body;
    mySqlConnection.query(getViajesQuery, [idViajes], (err, rows, fields) => {
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

routerViajes.post("/api/sitios", (req, res) => {
  if (!req.session.usuario)
    res.status(403).json({
      exito: false,
      mensaje: "Se debe iniciar sesión",
    });
  else {
    const { idPlacesLugar, idViajes, fechaEspecifica } = req.body;
    const checkIDQuery = `SELECT * FROM lugaresdeviajes WHERE idViajes = ${idViajes}`;
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
        const addPlaceQuery = `INSERT INTO lugaresdeviajes values (${idPlacesLugar}, ${idViajes}, "${fechaEspecifica}");`;
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
              info: rows,
            });
          }
        });
      }
    });
  }
});

routerViajes.put("/api/sitios", (req, res) => {
  if (!req.session.usuario)
    res.status(403).json({
      exito: false,
      mensaje: "Se debe iniciar sesión",
    });
  else {
    const { idPlacesLugar, fechaEspecifica } = req.body;
    const checkIDQuery = `SELECT * FROM lugaresdeviajes WHERE idPlacesLugar = ?`;
    mySqlConnection.query(
      checkIDQuery,
      [idPlacesLugar],
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
          const updatePlaceQuery = `UPDATE lugaresdeviajes SET fechaEspecifica= "${fechaEspecifica}" WHERE idPlacesLugar = ${idPlacesLugar};`;
          mySqlConnection.query(updatePlaceQuery, (err, rows, fields) => {
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
                info: rows,
              });
            }
          });
        }
      }
    );
  }
});

routerViajes.delete("/api/sitios", (req, res) => {
  if (!req.session.usuario)
    res.status(403).json({
      exito: false,
      mensaje: "Se debe iniciar sesión",
    });
  else {
    const { idPlacesLugar } = req.body;

    const deleteSitio = `DELETE FROM lugaresdeviajes WHERE idPlacesLugar = ${idPlacesLugar};`;
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
          mensaje: "Viaje eliminado con éxito",
        });
      }
    });
  }
});
