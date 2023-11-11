import { mySqlConnection } from "../database.js";
import { Router } from "express";
export const router=Router();

router.post("/api/crearCuenta/",(req, res)=>{
    const nom=req.query.nombre;
    const apeP=req.query.apellidoP;
    const apeM=req.query.apellidoM;
    const CE=req.query.correoElectronico;
    const usu=req.query.usuario;
    const con=req.query.contrasena;
    mySqlConnection.query(`select * from usuario where CorreoElectronico= '${CE}' or usuario='${usu}';`,(err,rows)=>{
        if(err){
            res.json({error:err});
            return;
        }
        
        if (rows.length === 0) {
            
            mySqlConnection.query(
                `insert into usuario(Nombre,ApellidoP,ApellidoM,CorreoElectronico,Usuario,Contrasena) value('${nom}','${apeP}','${apeM}','${CE}','${usu}','${con}');`,(err)=>{
                
                if(err){
                    
                    res.json(err);
                }
                else{
                    res.json({mensaje:"Se ha registrado correctamente"});
                }
            });

        }
        else {
            if (rows.some(row => row.CorreoElectronico === CE)) {
                console.log('La condición CorreoElectronico fue verdadera');
                res.json({mensaje:"Este correo ya existe registrado"});

            }
            
            else {
                console.log('La condición usuario fue verdadera');
                res.json({mensaje:"Este usuario ya se encuentra registrado"});

            }
             
        }
    });
});