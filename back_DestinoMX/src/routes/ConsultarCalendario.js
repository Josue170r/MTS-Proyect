import { mySqlConnection } from "../database.js";
import { Router } from "express";
export const router = Router();

// Cambié de 'post' a 'get'
router.post("/api/ConsultarCalendario", (req, res) => {
    console.log("Entró en la ruta /api/ConsultarCalendario");

    // Asumo que el ID del usuario está disponible en req.query.idUsuario
    const userId = req.query.idUsuario;

    // Verifica si el ID del usuario está presente en la solicitud
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "El ID del usuario no está presente en la solicitud."
        });
    }

    const sqlQuery = "SELECT * FROM viajes WHERE idUsuario = ?";
    const queryParams = [userId];

    console.log("Consulta SQL:", sqlQuery, queryParams);

    mySqlConnection.query(sqlQuery, queryParams, (err, results, otro) => {
        if (!err) {
            console.log("Resultados de la consulta:", results);
            res.json({
                success: true,
                message: "Consulta exitosa",
                data: results
            });
        } else {
            console.error("Error en la consulta:", err);
            res.status(500).json({
                success: false,
                message: "Error en la consulta",
                error: err
            });
        }
    });
});
