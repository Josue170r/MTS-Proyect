import express from "express";
import morgan from "morgan";
import session from "express-session";
import cookieParser from "cookie-parser";

import { routerViajes } from "./routes/viajes.js";
import { routerFavoritos } from "./routes/favoritos.js";
import { routerCalendario } from "./routes/calendario.js";
import { routerAutenticacion } from "./routes/autenticacion.js";
import { routerPreferencias } from "./routes/preferencias.js";
import { routerUsuario } from "./routes/usuario.js";
import { routerHistorial } from "./routes/historial.js";
import { routerApiDetails } from "./ApiGoogle/apiGoogleDetailsPlace.js";
import { routerApiWeather } from "./ApiGoogle/waetherPlace.js";
import { mailerApi } from "./Mailer/mailer.js";
import { routerRecuperacion } from "./routes/recuperacion.js";
import { routerValidacion } from "./routes/verificacion.js";
import { routerSitios } from "./routes/sitios.js";

// Inicializando la aplicacion.
const app = express();
import cors from 'cors';


//inclusion de back api cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Permite el envío de cookies
}));

app.use(cookieParser());

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
app.use(routerApiDetails);
app.use(routerApiWeather);
app.use(routerHistorial);
app.use(mailerApi);
app.use(routerValidacion);
app.use(routerRecuperacion);
app.use(routerSitios)
// Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`server listen on port ${app.get("port")}`);
});