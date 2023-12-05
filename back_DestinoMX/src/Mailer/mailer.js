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

    const mailOptions = {
        from,
        to,
        subject,
        html:''
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







  

