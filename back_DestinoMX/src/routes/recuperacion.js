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
                        //cambiar href con respecto a sus puertos de front                                                             (8081 o 8080 u otro)   ^^^^
                    }
                    catch(error){
                        return res.status(500).json({exito:false,mensaje:"Correo no enviado"})
                    }
                    /*const urlCompleta = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
                    console.log(req.get('port'));*/
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
            else{
                return res.status(200).json({mensaje:"Te enviamos un correo para recuperar tu cuenta"})
            }
        }
    })
});

routerRecuperacion.post("/api/cookieCorreo",(req, res)=>{
    let correo
    if(req.cookies.recuperacion_cookie){
        correo=req.cookies.recuperacion_cookie
        console.log(correo);
        return res.status(200).json({exito:false,correo})
    }
    else
        return res.status(401).json({exito:false,mensaje:"No hay cookie existente"})
})

routerRecuperacion.post("/api/contrasena-nueva",(req,res)=>{
    let contrasena

    if(!req.body.contrasena1 || !req.body.contrasena2)
        return res.status(401).json({exito:false,mensaje:"Falta llenar los campos"})
    if(req.body.contrasena1 != req.body.contrasena2)
        return res.status(401).json({exito:false,mensaje:"Las contraseñas no coinciden"})
    else{
        contrasena=req.body.contrasena1
        
        let correo
        if(req.cookies.recuperacion_cookie){
            correo=req.cookies.recuperacion_cookie
            console.log(correo);
            // Crear un objeto de descifrado usando el mismo algoritmo y clave
            const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
            //Desencriptar el valor
            let correoD = decipher.update(correo, 'hex', 'utf-8');
            correoD += decipher.final('utf-8');

            console.log('Valor desencriptado:', correo);
            console.log(contrasena);
            mySqlConnection.query(`update usuario set contrasena="${contrasena}" where CorreoElectronico="${correoD}"`,
            (err, results) => {
                
                if (err) {
                //Caso de error
                return res.status(400).json({
                    exito: false,
                    mensaje: "Error al conectar la base",
                    err: err,
                });
                } else {
                    res.clearCookie("recuperacion_cookie")
                    return res.status(200).json({exito: true, mensaje:"Se ha actualizado su contraseña correctamente"})
                }
            })
        }
        else{
            return res.status(401).json({exito:false,mensaje:"Se ha agotado su tiempo"})
        }
        
    }

})