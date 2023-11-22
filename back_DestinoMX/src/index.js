import express from "express";
import morgan from "morgan";
import session from "express-session";


import { routerViajes } from "./routes/viajes.js";
import { routerFavoritos } from "./routes/favoritos.js";
import { routerCalendario } from "./routes/calendario.js";
import { routerAutenticacion } from "./routes/autenticacion.js";
import { routerPreferencias } from "./routes/preferencias.js";
import { routerUsuario } from "./routes/usuario.js";

// Inicializando la aplicacion.
const app = express();
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:8080', 
  credentials: true, 
}));

// Settings
// Utilizar el puerto definido por el servidor (al subirlo a la web), si no existe utiliza por defecto el puerto 3000 (local)
app.set("port", process.env.PORT || 4000);

// Middlewares. Procesa datos antes de que los reciba el servidor.
// Permite ver las peticiones en consola, no tiene ninguna función en la app.
app.use(morgan("dev"));

// Permite recibir los datos a través de un formulario
app.use(express.urlencoded({ extended: true }));

// Utiliza el formato de datos json
app.use(express.json());

// Creando la sesion del usuatio.
app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    }
  })
);

// Routes -> ./routes/index.js
app.use(routerAutenticacion);
app.use(routerViajes);
app.use(routerFavoritos);
app.use(routerCalendario);
app.use(routerPreferencias);
app.use(routerUsuario);

// Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`server listen on port ${app.get("port")}`);
});
