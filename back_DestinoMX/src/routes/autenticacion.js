import { mySqlConnection } from "../DB/DB_connection.js";
import { Router } from "express";

export const routerAutenticacion = Router();

// Crear cuenta
// Recibe:
// Nombre, ApellidoP, apellidoM, CorreoElectronico, Usuario, contrasena
// Funciona OK

routerAutenticacion.post("/api/crear-cuenta", (req, res) => {
  const {
    Nombre,
    ApellidoP,
    ApellidoM,
    CorreoElectronico,
    Usuario,
    contrasena,
  } = req.body;

  mySqlConnection.query(
    `select * from usuario where CorreoElectronico= '${CorreoElectronico}' or Usuario='${Usuario}';`,
    (err, rows) => {
      if (err) {
        res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err: err,
        });
      } else if (rows.length === 0) {
        mySqlConnection.query(`insert into usuario(Nombre,ApellidoP,ApellidoM,CorreoElectronico,Usuario,Contrasena) value('${Nombre}','${ApellidoP}','${ApellidoM}','${CorreoElectronico}','${Usuario}','${contrasena}');`,
          (err) => {
            if (err) {
              res.status(500).json({
                exito: false,
                mensaje: "Error en la consulta",
                err: err,
              });
            } else {
              res.status(200).json({
                exito: true,
                mensaje: "Cuenta creada correctamente.",
              });
            }
          }
        );
      } else {
        if (rows.some((row) => row.CorreoElectronico === CorreoElectronico)) {
          res
            .status(409)
            .json({ exito: false, mensaje: "Correo electronico ya en uso." });
        } else {
          res
            .status(409)
            .json({ exito: false, mensaje: "Nombre de usuario ya en uso." });
        }
      }
    }
  );
});

// Iniciar Sesion - Login
// Recibe:
// CorreoElectronico o Usuario, contrasena
// Funciona OK
routerAutenticacion.post("/api/iniciar-sesion", (req, res) => {
  const { Usuario, contrasena } = req.body
  mySqlConnection.query(
    `SELECT idUsuario,contrasena from Usuario WHERE CorreoElectronico = "${Usuario}" OR Usuario = "${Usuario}"`,
    (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          exito: false,
          mensaje: "Error en la consulta",
          err: err,
        });
      } else if (rows.length === 0) {
        res
          .status(403)
          .json({ exito: false, mensaje: "Usuario no encontrado." });
      } else {
        const contrasenaBD = rows[0].contrasena;
        if (contrasenaBD === contrasena) {
          req.session.usuario = {
            idUsuario: rows[0].idUsuario,
          };
          res
            .status(200)
            .json({ exito: true, mensaje: "Sesion iniciada con exito." });
        } else {
          res
            .status(403)
            .json({ exito: false, mensaje: "La contraseña no es correcta." });
        }
      }
    }
  );
});

//Cerrar sesion - Logout
routerAutenticacion.get("/api/cerrar-sesion", (req, res) => {
  req.session.destroy((err) => {
    if (err)
      res.status(500).json({
        exito: false,
        mensaje: "Error en la consulta",
        err: err,
      });
    else
      res
        .status(200)
        .json({ exito: true, mensaje: "Sesion cerrada con exito." });
  });
});
