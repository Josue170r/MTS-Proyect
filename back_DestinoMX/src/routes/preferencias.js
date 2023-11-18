import { mySqlConnection } from "../DB/DB_connection.js";
import { Router } from "express";

export const routerPreferencias = Router();



//Consulta - Angel


//Insercion - Pedro
routerPreferencias.post("/api/PreferenciasInsert", (req, res) => {
    console.log("Entró en la ruta /api/PreferenciasInsert (Create)");

    // Asumo que los datos de preferencias están disponibles en req.body
    const { idUsuario, idCatPreferencias } = req.body;

    // Verifica si los datos requeridos están presentes en la solicitud
    if (!idUsuario) {
        return res.status(400).json({
            success: false,
            message: "idUsuario es un campo obligatorio."
        });
    }

    const idCatPreferenciasValue = idCatPreferencias || 'valor_predeterminado';

    const sqlQuery = "INSERT INTO Preferencias (idUsuario, idCatPreferencias) VALUES (?, ?)";
    const queryParams = [idUsuario, idCatPreferenciasValue];

    console.log("Consulta SQL:", sqlQuery, queryParams);

    mySqlConnection.query(sqlQuery, queryParams, (err, results) => {
        if (!err) {
            console.log("Inserción exitosa");
            res.json({
                success: true,
                message: "Inserción de preferencias exitosa",
                data: results
            });
        } else {
            console.error("Error en la inserción:", err);
            res.status(500).json({
                success: false,
                message: "Error en la inserción de preferencias",
                error: err
            });
        }
    });
});


//Modificacion - Rodrigo
routerPreferencias.post("/api/preferentsUpdate/", (req,res)=>{
   
    const idUsuario=req.body.idUsuario;
    const idPreferencias=req.body.idUsuarioPreferencias;

    //verificaciones de existencias
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

    mySqlConnection.query(`delete from preferencias where idUsuario=${idUsuario}`,(err)=>{
        if(err){
            return res.status(400).json({
                success: false,
                error: "Error al conectar a la base",
                message: err
            });
        }
        else{
            for(const key in idPreferencias){
                const value=idPreferencias[key];
                
                mySqlConnection.query(`insert into preferencias values (${idUsuario}, "${value}");`,(err2)=>{
                    if(err2){
                        return res.status(400).json({
                            success: false,
                            error: "Error al conectar a la base",
                            message: err2
                        });
                    }
                });
            }
            return res.json({mensaje: "Se han modificado correctamente"});
        } 
        
        
    });
});