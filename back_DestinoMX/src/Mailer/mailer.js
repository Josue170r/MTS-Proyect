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
let to
let subject
let text

mailerApi.post("/api/mailer",(req,res)=>{
    
    to = req.body.to
    subject = req.body.subject
    text = req.body.text
 
    if(!to || !subject || !text){
        return res.status(400).json({
            exito:false,
            mensaje:"Faltan más parametros"
        })
    }   
    mandarCorreo(to, subject, text)   
})

export function mandarCorreo(to, subject, text){
    const mailOptions = {
        from,
        to,
        subject,
        html:`
        <html background: #000>
    <head>
        <style>
            body {
                font-family: 'Quicksand', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #FFFF;
            }

            h2 {
                color: black;
                text-align: center;
                margin-bottom: 10px;
                font-weight: normal;
            }
            h3 {
                color: black;
                text-align: center;
                margin-bottom: 10px;
                letter-spacing: 5px;
                font-weight: border;
                font-size: 25px
            }

            p{
                font-weight: bold;
                text-decoration: underline;
                text-align: center;
            }

            img {
                max-width: 100%;
                min-width: 50%;
                height: auto;
                display: block;
                margin: 0 auto;
                border-radius: 20px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
                margin-top: 10px
            }
            .tamaño{
                max-width: 70%;
                border-radius: 0px;
            }
        </style>
    </head>
    <body>
        <img class="tamaño" src="https://lh3.googleusercontent.com/pw/ADCreHfKG3Xi0yjFeFAPcRPLKdsFjKt4mYKs9ZGyGOosY5-dNgqonGh7TuwaqjA5jKux5FbK3vyg5yHBUTK5X6bTW8BwNuSIAhdu9MQl-xOr6AVlcfEg05u68iM8o6ugZb5XckW2TS6AOv5zPXtsMkw7FR8p=w2046-h145-s-no?authuser=0" alt="MTS: Mexico Travel Solutions">
        <img src="https://lh3.googleusercontent.com/pw/ADCreHeuEDAWeyVNA6tlc2NtJNhFIAXPg1aYqO9QEt3gBZUyGzwue8Mw4LweOPL6C8Bxh04D_29X_g4LuvdYzAiiax0fX_Iubo0D7K0F0oz4LMK9KRQJ9dGDFd8sJ6G2FCavY9P1gm_qAwbDxXlPxLOQ5Uui=w950-h300-s-no-gm?authuser=0" alt="bannerMTS">
        <p>${text}</p>    
    </body>
</html>
        `
};
    transporte.sendMail(mailOptions, (error, info) => {
        
        if (error) {
            console.log("req");
        console.error(error);
        return res.status(400).json({exito:false,mensaje:error});
        }
        console.log('Email sent: ' + info.response);
        return res.status(200).json({exito:true,mensaje:"Te enviamos un código a tu correo electrónico"});
  });
}






  

