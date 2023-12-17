import { mySqlConnection } from "../DB/DB_connection.js";
import { Router } from "express";

export const routerUsuario = Router();

routerUsuario.delete("/api/eliminar-cuenta", (req, res) => {
  if (!req.session.usuario) {
    res.status(403).json({ exito: false, mensaje: "Se debe inicar sesion." });
  } else {
    const consultaDeEliminacion = `DELETE FROM usuario WHERE idUsuario = ${req.session.usuario.idUsuario}`;
    mySqlConnection.query(consultaDeEliminacion, (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          exito: false,
          mensaje: "No se pudo eliminar tu cuenta",
          err: err,
        });
      } else {
        res
        
          .status(200)
          .json({ exito: true, mensaje: "¡La cuenta ha sido eliminada!" });
      }
    });
  }
});

routerUsuario.get("/api/perfil", (req, res) => {
  console.log("Request from api/perfil:", req.session);
  if (!req.session.usuario) {
    res.status(403).json({ exito: false, mensaje: "Se debe inicar sesion." });
  } else {
    const consultaDeObtencionDeDatos = `SELECT Usuario,Nombre,ApellidoP,ApellidoM,CorreoElectronico FROM usuario WHERE idUsuario = ${req.session.usuario.idUsuario}`;
    mySqlConnection.query(consultaDeObtencionDeDatos, (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          exito: false,
          mensaje: "No se pudieron obtener los datos del usuario.",
          err: err,
        });
      } else {
        res.status(200).json({
          exito: true,
          mensaje: "Datos obtenidos correctamente",
          datosUsuario: { ...rows[0] },
        });
      }
    });
  }
});

routerUsuario.put("/api/editar-perfil", (req, res) => {
  if (!req.session.usuario)
    res.status(403).json({ exito: false, mensaje: "Se debe inicar sesion." });
  else {
    console.log(req);
    const { Nombre, ApellidoP, ApellidoM } = req.body;
    const consultaCambiarDatos = `UPDATE usuario SET Nombre = "${Nombre}", ApellidoP = "${ApellidoP}", ApellidoM = "${ApellidoM}" WHERE idUsuario = "${req.session.usuario.idUsuario}"`;
    mySqlConnection.query(consultaCambiarDatos, (err, rows, fields) => {
      if (err)
        res.res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err: err,
        });
      else {
        res.status(200).json({
          exito: true,
          mensaje: "Datos actualizados con exito.",
          rows,
        });
      }
    });
  }
});

routerUsuario.put("/api/cambiar-contrasena", (req, res) => {
  if (!req.session.usuario)
    res.status(403).json({ exito: false, mensaje: "Se debe inicar sesion." });
  else {
    const { contrasena, nuevaContrasena } = req.body;
    const consultaVerificarContrasena = `SELECT contrasena from usuario WHERE idUsuario = ${req.session.usuario.idUsuario}`;
    mySqlConnection.query(consultaVerificarContrasena, (err, rows, fields) => {
      if (err)
        res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err: err,
        });
      else {
        if (contrasena !== rows[0].contrasena)
          res.status(403).json({
            exito: false,
            mensaje: "Contraseña incorrecta",
          });
        else {
          const consultaActualizarContrasena = `UPDATE usuario SET contrasena = "${nuevaContrasena}" WHERE idUsuario = ${req.session.usuario.idUsuario}`;
          mySqlConnection.query(
            consultaActualizarContrasena,
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
                  mensaje: "Contraseña actualizada correctamente",
                  rows,
                });
              }
            }
          );
        }
      }
    });
  }
});
