import { Router } from "express";

export const routerValidacion = Router();

routerValidacion.post("/api/cookie-validacion", (req,res) => {
    const date=new Date(Date.now()+30000)
    console.log(date)
    const codigo=123456
    res.cookie('codigo_validacion', codigo, { expires: date, httpOnly: true });

    return res.status(200).json({mensaje:date})
})