import { mySqlConnection } from "../DB/DB_connection.js";
import { Router } from "express";

export const routerRecuperacion = Router();

//Recuperacion Contrasena
routerRecuperacion.get("/api/recuperar-contrasena/", (req,res) => {
    let idUsuario
    if (!req.session.usuario) {
        return res.status(403).json({
            exito: false,
            mensaje: "Se debe iniciar sesion.",
        });
    }else{
        idUsuario=req.session.usuario.idUsuario;
    }
    //Consulta en la BD
    let Email
    mySqlConnection.query(
    `SELECT CorreoElectronico FROM usuario WHERE CorreoElectronico = "${Email}"`,(err,results) => {
    if(err){
        //Caso de Error
        return res.status(400).json({
            success: false,
            error: "Error al conectar la base",
            message: err,
        });
    }else{
        //Realizar Cookie
        console.log('Hola');
    }
    }
    );
});