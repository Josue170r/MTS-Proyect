import { Router } from "express";
import { mySqlConnection } from "../DB/DB_connection.js";
import crypto from "crypto";
import { mandarCorreo } from "../Mailer/mailer.js"

export const routerRestablecer = Router();

const secretKey = 'MTS-2023';


routerRestablecer.post("/api/cookie-cifra-creacion", (req,res) => {
   //fecha y hora de vencimiento
   const date=new Date(Date.now()+120000)
   console.log(date)

   let correo
   if(!req.body.correo)
       return res.status(500).json({exito:false,mensaje:"Correo no encontrado"})
   else{
       correo=req.body.correo
   }

   //creacion de cifra de validacion
   let cifra='';K0
   for(let i=0,a=0;i<6;i++){
       let temp=Math.floor(Math.random() * (9 - 0)) + 0
       if(a==0 && i==0 && temp==0)
           i--
       else
           cifra+=String(temp)
   }

   try{
       mandarCorreo(correo,"Codigo de verificación - MTS","<h2>Su código de verificacion es </h2> <h1>"+cifra+"</h1>")
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



routerRestablecer.post("/api/restablecer-contrasena", (req, res) => {
   let codigoUsuario;
   let correo;

   if (!req.body.correo || !req.body.codigoUsuario) {
       return res.status(400).json({ exito: false, mensaje: "Correo o valor no proporcionado" });
   }

   correo = req.body.correo;
   codigoUsuario = req.body.codigoUsuario;

   // Obtener el código almacenado en la cookie
   const codigo = req.cookies.codigo_validacion;

   // Verificar si la cookie está presente
   if (!codigo) {
       return res.status(400).json({ exito: false, mensaje: "Tiempo agotado o código no proporcionado" });
   }

   // Desencriptar el valor de la cookie
   const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
   let valorDesencriptado = decipher.update(codigo, 'hex', 'utf-8');
   valorDesencriptado += decipher.final('utf-8');

   console.log('Valor desencriptado:', valorDesencriptado);

   // Verificar si el código de usuario coincide
   if (codigoUsuario === valorDesencriptado) {
       if (!req.session.usuario) {
           return res.status(403).json({ exito: false, mensaje: "Se debe iniciar sesión." });
       }

       const { contrasena, nuevaContrasena } = req.body;
       const consultaVerificarContrasena = `SELECT contrasena FROM usuario WHERE idUsuario = ${req.session.usuario.idUsuario}`;

       mySqlConnection.query(consultaVerificarContrasena, (err, rows, fields) => {
           if (err) {
               return res.status(500).json({
                   exito: false,
                   mensaje: "Error en la consulta",
                   err: err,
               });
           }

           if (contrasena !== rows[0].contrasena) {
               return res.status(403).json({
                   exito: false,
                   mensaje: "Contraseña incorrecta",
               });
           }

           const consultaActualizarContrasena = `UPDATE usuario SET contrasena = "${nuevaContrasena}" WHERE idUsuario = ${req.session.usuario.idUsuario}`;

           mySqlConnection.query(consultaActualizarContrasena, (err, rows, fields) => {
               if (err) {
                   return res.status(500).json({
                       exito: false,
                       mensaje: "Error al actualizar la contraseña",
                       err: err,
                   });
               }

               return res.status(200).json({
                   exito: true,
                   mensaje: "Contraseña actualizada correctamente Ñ",
                   rows,
               });
           });
       });
   } else {
       return res.status(400).json({ exito: false, mensaje: "Código inválido" });
   }
});
