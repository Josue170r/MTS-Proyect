import { mySqlConnection } from "../DB/DB_connection.js";
import { Router } from "express";

export const routerPreferencias = Router();

//Consulta - Angel
routerPreferencias.post("/api/PreferenciasRead/", (req, res) => {
  const idUsuario = req.session.usuario.idUsuario;
  //const idCatPreferencias = req.body.idUsuarioPreferencias;
  mySqlConnection.query(
    `SELECT catpreferencias.idPlacesTipo FROM catpreferencias INNER JOIN preferencias ON preferencias.idCatPreferencias=catpreferencias.idCatPreferencias WHERE preferencias.idUsuario="${idUsuario}"`,
    (err, results) => {
      if (err) {
        //Caso de error
        return res.status(400).json({
          success: false,
          error: "Error al conectar la base",
          message: err,
        });
      } else {
        //Muestra contenido existente
        return res.json(results);
      }
    }
  );
});

routerPreferencias.post("/api/consultar-Pantalla-Preferencias/", (req, res) => {
  let idUsuario 
  const idPreferencias=[];
  if (!req.session.usuario) {
    return res.status(403).json({
      exito: false,
      mensaje: "Se debe iniciar sesion.",
    });
  }
  else{
    idUsuario=req.session.usuario.idUsuario;
  }
  //const idCatPreferencias = req.body.idUsuarioPreferencias;
  mySqlConnection.query(
    `select idCatPreferencias from preferencias where idUsuario="${idUsuario}"`,
    (err, results) => {
      if (err) {
        //Caso de error
        return res.status(400).json({
          success: false,
          error: "Error al conectar la base",
          message: err,
        });
      } else {
        //Muestra contenido existente
        const idCatPreferenciasArray = results.map((result) => result.idCatPreferencias);
        console.log(idCatPreferenciasArray);
        return res.json(idCatPreferenciasArray);
      }
    }
  );
});

//Modificacion - Rodrigo
routerPreferencias.put("/api/modificar-preferencias/", (req, res) => {
  const {idPreferencias} = req.body;
  let idUsuario=null;

  //verificaciones de existencias
  if (!req.session.usuario) {
    return res.status(403).json({
      exito: false,
      mensaje: "Se debe iniciar sesion.",
    });
  }
  else{
    idUsuario=req.session.usuario.idUsuario;
  }
  if (!idPreferencias) {
    return res.status(500).json({
      exito: false,
      mensaje: "No has seleccionado ninguna preferencia",
    });
  }

  if (Object.keys(idPreferencias).length < 3) {
    return res.status(500).json({
      exito: false,
      mensaje: "Se requiere al menos 3 preferencias",
    });
  }

  mySqlConnection.query(
    `delete from preferencias where idUsuario=${idUsuario}`,
    (err) => {
      if (err) {
        return res.status(400).json({
          exito: false,
          message: "Error al conectar con la base de datos",
          err: err,
          
        });
      } else {
        const promesasConsultas = [];

        for (const key in idPreferencias) {
          const value = idPreferencias[key];

          const promesaConsulta = new Promise((resolve, reject) => {
            mySqlConnection.query(
              `insert into preferencias values (${idUsuario}, "${value}");`,
              (err2) => {
                if (err2) {
                  reject(err2);
                } else {
                  resolve();
                }
              }
            );
          });

          promesasConsultas.push(promesaConsulta);
        }

        // Utiliza Promise.all para esperar que todas las consultas se completen
        Promise.all(promesasConsultas)
          .then(() => {
            // Todas las consultas fueron exitosas
            return res.status(200).json({ 
              exito: true,
              mensaje: "Se han modificado correctamente" },
              );
          })
          .catch((error) => {
            // Al menos una consulta falló
            console.error(error);
            return res.status(400).json({
              exito: false,
              mensaje: "No se pudo registrar al menos una preferencia",
              err: err,
            });
          });
      }
      
    }
    
  );
});
