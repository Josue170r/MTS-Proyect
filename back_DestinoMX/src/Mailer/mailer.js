import nodemailer from 'nodemailer';
import { Router } from "express";

export const mailerApi = Router();

const transporte = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mtsads77@gmail.com', // Coloca tu dirección de correo aquí
        pass: 'lbot yidr fxil vgod' // Coloca tu contraseña aquí
    }
});

const from = "mtsads77@gmail.com"


mailerApi.post("/api/mailer",(req,res)=>{
    
    const {to, subject, text} = req.body
 
    if(!to || !subject || !text){
        return res.status(400).json({
            exito:false,
            mensaje:"Faltan mas parametros"
        })
    }
    
    console.log(req.body);

    const mailOptions = {
        from,
        to,
        subject,
        html:`
        <html>
        <body>
        <table border="1" style="height: 59px; width: 96.9913%; border-collapse: collapse; background-color: #ffb833;" height="120">
        <tbody>
        <tr>
        <td style="width: 100%; text-align: center;"><strong><h1>MTS, Mexico Travel Solucions</h1></strong></td>
        </tr>
        </tbody>
        </table>
        <p style="text-align: justify;"><h2>Hola, muchas gracias por utilizar MTS, para sus soluciones de viajes.</h2></p>
        <p style="text-align: justify;">${text}</p>
        </body>
        </html>
        `
      };
    transporte.sendMail(mailOptions, (error, info) => {
        
        if (error) {
            console.log("req");

        console.error(error);
        return;
        }
        console.log('Email sent: ' + info.response);
        return res.status(200);
  });
})







  

