import { Router } from "express";
import { mySqlConnection } from "../DB/DB_connection.js";
import crypto from "crypto";
import { mandarCorreo } from "../Mailer/mailer.js"

export const routerValidacion = Router();

const secretKey = 'MTS-2023';


routerValidacion.post("/api/cookie-cifra-creacion", (req,res) => {
    //fecha y hora de vencimiento, 5 minutos despues
    const date=new Date(Date.now()+300000)
    console.log(date)

    let correo
    if(!req.body.correo)
        return res.status(500).json({exito:false,mensaje:"Correo no encontrado"})
    else{
        correo=req.body.correo
    }

    //creacion de cifra de validacion
    let cifra='';
    for(let i=0,a=0;i<6;i++){
        let temp=Math.floor(Math.random() * (9 - 0)) + 0
        if(a==0 && i==0 && temp==0)
            i--
        else
            cifra+=String(temp)
    }

    try{
        mandarCorreo(correo,"Código de verificación - MTS","<h2>El siguiente código de verificación es válido durante los proximos: <br> 5 minutos <br>  Su código de verificación es: </h2> <h3>"+cifra+"</h3>")
    }
    catch(error){
        return res.status(500).json({exito:false,mensaje:"Correo no enviado"})
    }

    //encriptacion
    // Crear un objeto de cifrado usando el algoritmo AES con una clave
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    let valorEncriptado = cipher.update(cifra, 'utf-8', 'hex');
    valorEncriptado += cipher.final('hex');
    console.log('Valor encriptado:', valorEncriptado);

    res.cookie('codigo_validacion', valorEncriptado, { expires: date, httpOnly: true });

    return res.status(200).json({mensaje:"Se ha enviado el correo"})
})

routerValidacion.post("/api/cookie-cifra-validacion", (req,res) => {

    let codigoUsuario
    let correo

    if(!req.body.correo)
        return res.status(500).json({exito:false,mensaje:"Correo no encontrado"})
    else{
        correo=req.body.correo
    }
    if(!req.body.codigoUsuario)
        return res.status(500).json({exito:false,mensaje:"Valor no encontrado"})
    else
        codigoUsuario=req.body.codigoUsuario

    //obtener encriptado de cookie
    let codigo
    if(req.cookies.codigo_validacion)
        codigo=req.cookies.codigo_validacion
    else
        return res.status(400).json({exito:false,mensaje:"Se ha agotado su tiempo"})

    // Crear un objeto de descifrado usando el mismo algoritmo y clave
    const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
    //Desencriptar el valor
    let valorDesencriptado = decipher.update(codigo, 'hex', 'utf-8');
    valorDesencriptado += decipher.final('utf-8');

    console.log('Valor desencriptado:', valorDesencriptado);

    if(codigoUsuario==valorDesencriptado){
        mySqlConnection.query(
            `update usuario set codigoValidacion=000000 where CorreoElectronico='${correo}';`,
            (err, results) => {
                
                if (err) {
                    console.log("llega");
                //Caso de error
                return res.status(400).json({
                    exito: false,
                    mensaje: "Error al conectar la base",
                    err: err,
                });
                } else {
                    return res.status(200).json({exito: true, mensaje:"Se ha verificado correctamente"})
                }
            }
        );
    }
    else
        return res.status(400).json({exito: false,mensaje:"Codigo invalido"})    
}) 





