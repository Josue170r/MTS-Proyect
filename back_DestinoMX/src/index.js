import express from "express";
import morgan from "morgan";
import { router } from "./routes/routes.js";
const app = express();

// Settings
// Utilizar el puerto definido por el servidor (al subirlo a la web), si no existe utiliza por defecto el puerto 3000 (local)
app.set("port", process.env.PORT || 4000);

// Middlewares. Procesa datos antes de que los reciba el servidor.
// Permite ver las peticiones en consola, no tiene ninguna función en la app.
app.use(morgan("dev"));
// Permite recibir los datos a través de un formulario
app.use(express.urlencoded({ extended: false }));
// Utiliza el formato de datos json
app.use(express.json());

// Routes -> ./routes/index.js
app.use(router);

// Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`server listen on port ${app.get("port")}`);
});
