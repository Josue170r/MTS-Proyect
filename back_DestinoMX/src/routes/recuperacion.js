import { mySqlConnection } from "../DB/DB_connection.js";
import { Router } from "express";
import crypto from "crypto";
import { mandarCorreo } from "../Mailer/mailer.js"

export const routerRecuperacion = Router();

const secretKey = 'MTS-2023';

//Recuperacion Contrasena
routerRecuperacion.post("/api/cookie-correo-mandar/", (req,res) => {
    const date=new Date(Date.now()+300000)
    console.log(date)

    let correo
    if(!req.body.correo)
        return res.status(500).json({exito:false,mensaje:"Correo no encontrado"})
    else{
        correo=req.body.correo
    }

    mySqlConnection.query(`select IFNULL(codigoValidacion, 1) as codigo from usuario where CorreoElectronico="${correo}";`,(err,results)=>{
        if(err){
            return res.status(400).json({exito:false, mensaje:"error al conectar con la base de datos"})
        }
        else{
            if(results.length!=0){
                if(results[0].codigo==0){
                    try{
                        mandarCorreo(correo,"Restablacer contraseña - MTS","<h2>Abrir link para restablecer la contreaseña </h2> <h3><a href=http://localhost:8081/#/newPassword>link</a></h3>")
                    }
                    catch(error){
                        return res.status(500).json({exito:false,mensaje:"Correo no enviado"})
                    }
                    //encriptacion
                    // Crear un objeto de cifrado usando el algoritmo AES con una clave
                    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
                    let valorEncriptado = cipher.update(correo, 'utf-8', 'hex');
                    valorEncriptado += cipher.final('hex');
                    console.log('Valor encriptado:', valorEncriptado);

                    res.cookie('recuperacion_cookie', valorEncriptado, { expires: date, httpOnly: true });

                    return res.status(200).json({mensaje:"Te enviamos un correo para recuperar tu cuenta"})
                }
                else{
                    return res.status(200).json({exito:true,mensaje:"No se ha validado el correo"})
                }
            }
        }
    })
});


/*let idUsuario
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
    );*/