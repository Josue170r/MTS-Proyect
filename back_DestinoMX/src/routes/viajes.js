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
      `SELECT * FROM viajes WHERE idViajes = ${req.session.usuario.idUsuario};`,
      (err, rows, fields) => {
        if (err) {
          res.status(500).json({
            exito: false,
            mensaje: "Error en la consulta",
            err: err,
          });
        } else if (rows.length === 0) {
          res.status(404).json({ exito: false, mensaje: "Viaje inexistente." });
        } else {
          res.status(200).json({ exito: true, info: { ...rows[0] } });
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
          res.res.status(500).json({
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
          const nombreMiViajeSQL = req.query.nombreMiViaje.trim();

          // Ver si existe un viaje con el mismo nombre.
          mySqlConnection.query(
            `SELECT * FROM viajes WHERE nombreMiViaje = "${nombreMiViajeSQL}" AND idUsuario = "${idUsuario}"`,
            (err, rows, fields) => {
              if (err) {
                res.res.status(500).json({
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
                const diaInicio = new Date(req.query.diaInicio);
                const diaFinal = new Date(req.query.diaFinal);

                const diaInicioSQL = diaInicio.toISOString().slice(0, 10);
                const diaFinalSQL = diaFinal.toISOString().slice(0, 10);

                // Registrar el viaje
                mySqlConnection.query(
                  `INSERT INTO viajes (nombreMiViaje,descripcionViaje,diaInicio,diaFinal,colorPlantilla,idUsuario) VALUES ("${nombreMiViajeSQL}","${req.query.descripcionViaje}","${diaInicioSQL}","${diaFinalSQL}","${req.query.colorPlantilla}","${idUsuario}");`,
                  (err, rows, fields) => {
                    if (err) {
                      res.res.status(500).json({
                        exito: false,
                        mensaje: "Error en la consulta",
                        err: err,
                      });
                    } else {
                      res.status(200).json({
                        exito: false,
                        mensaje: "Viaje agregado con exito.",
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
        res.res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err: err,
        });
      else if (rows.length === 0)
        res.status(404).send({ exito: false, mensaje: "Usuario inexistente." });
      else {
        // Ver que si exista un viaje con ese idViajes.
        const consultaIDViaje = `SELECT (idViajes) FROM viajes WHERE idViajes = ${req.query.idViajes};`;
        mySqlConnection.query(consultaIDViaje, (err, rows, fields) => {
          if (err) {
            res.res.status(500).json({
              exito: false,
              mensaje: "Error en la consulta",
              err: err,
            });
          } else if (rows.length === 0) {
            res
              .status(404)
              .json({ exito: false, mensaje: "Viaje inexistente." });
          } else {
            const nombreViajeSQL = req.query.nombreMiViaje.trim();
            const consultaNombreViaje = `SELECT * FROM viajes WHERE idViajes = ${req.query.idViajes} AND nombreMiViaje = "${nombreViajeSQL}"`;
            mySqlConnection.query(consultaNombreViaje, (err, rows, fields) => {
              if (err) {
                res.res.status(500).json({
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
                const diaInicio = new Date(req.query.diaInicio);
                const diaFinal = new Date(req.query.diaFinal);

                const diaInicioSQL = diaInicio.toISOString().slice(0, 10);
                const diaFinalSQL = diaFinal.toISOString().slice(0, 10);

                const {
                  idViajes,
                  nombreMiViaje,
                  descripcionViaje,
                  colorPlantilla,
                } = req.query;
                const consultaActualizarViaje = `UPDATE viajes SET nombreMiViaje = "${nombreMiViaje}", descripcionViaje = "${descripcionViaje}", diaInicio = '${diaInicioSQL}', diaFinal = '${diaFinalSQL}', colorPlantilla = '${colorPlantilla}' where idViajes = ${idViajes};`;

                mySqlConnection.query(
                  consultaActualizarViaje,
                  (err, rows, fields) => {
                    if (err)
                      res.res.status(500).json({
                        exito: false,
                        mensaje: "Error en la consulta",
                        err: err,
                      });
                    else {
                      res.status(200).json({
                        exito: true,
                        mensaje: "Viaje actualizado con exito.",
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
    const consultaDeEliminacion = `DELETE FROM viajes WHERE idViajes = ${req.query.idViajes}`;
    mySqlConnection.query(consultaDeEliminacion, (err, rows, fields) => {
      if (err) {
        res.res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err: err,
        });
      } else {
        res
          .status(200)
          .json({ exito: true, mensaje: "Viaje eliminado correctamente." });
      }
    });
  }
});
