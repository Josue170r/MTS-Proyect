import { mySqlConnection } from "../DB/DB_connection.js";
import { Router } from "express";

export const routerPreferencias = Router();

//Consulta - Angel
routerPreferencias.post("/api/preferenciasRead/",(req,res) =>{
    const idUsuario = req.body.idUsuario;
    const idCatPreferencias = req.body.idUsuarioPreferencias;
    if (!idUsuario) {
        return res.status(500).json({
            success: false,
            message: "idUsuario es un campo obligatorio."
        });
    }
    if(!idPreferencias){
        return res.status(500).json({
            success: false,
            message: "Preferencias obligatorias"
        });
    }

    if(Object.keys(idPreferencias).length<=0){
        return res.status(500).json({
            success: false,
            message: "Preferencias obligatorias"
        });
    }
    
    mySqlConnection.query(`WITH a as(
        SELECT idCatPreferencias FROM preferencias WHERE idUsuario="${req.query.idUsuario}")`,(err,rows) =>{
        if(err){//Caso de error
            return res.status(400).json({
                success: false,
                error:"Error al conectar la base",
                message: err
            });
        } else {
            //Muestra contenido existente
            for(const key in idPreferencias){
                const value = idCatPreferencias[key];
                mySqlConnection.query(`SELECT idPlacesTipo FROM catpreferencias WHERE idCatPreferencias in (SELECT * FROM a)`,(err2) => {
                    if(err2){
                        return res.status(400).json({
                        success: false,
                        error: "Error al conectar a la base",
                        message: err2
                        });
                    }
            });
            return res.json({mensaje:"Consulta realizada correctamente"});
        }
    }
});
//Insercion - Pedro

//Modificacion - Rodrigo