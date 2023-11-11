import express from "express";
//const express = require('express');
export const router = express.Router();
import { mySqlConnection } from '../database.js';
//const mySqlConnection = require('../database');


//Routes
router.post("/api/login", (req, res) => {
    mySqlConnection.query(`SELECT CorreoElectronico,contrasena from Usuario WHERE CorreoElectronico = "${req.query.credencial}"`, (err, rows, fields) => {
    if(err){
            res.json(err);
    } else if(rows.length === 0) {
        mySqlConnection.query(`SELECT usuario,contrasena from Usuario WHERE Usuario = "${req.query.credencial}"`,(err, rows, fields) => {
        console.log(rows);    
            if(err) {
                res.json(err);
            } else if(rows.length === 0) {
                res.json({"Mensaje": "Usuario no encontrado."});
            } else {
                //Iniciar sesion con el usuario
                const contrasenaBD = rows[0].contrasena;
                if(contrasenaBD === req.query.contrasena){
                    res.json({mensaje:'Acceso Permitido'});
                }else{
            res.json({mensaje:'Acceso Denegado'});
                }
            }
        });
    } else {
        // Si existe el correo electronico.
        const contrasenaBD = rows[0].contrasena;
        if(contrasenaBD === req.query.contrasena){
            res.json({mensaje:'Acceso Permitido'});
        }else{
            res.json({mensaje:'Acceso Denegado'});
        }
    }
});
}); 
