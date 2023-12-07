import express from "express";
import morgan from "morgan";
import session from "express-session";
<<<<<<< HEAD
import https from "https";
import fs from "fs";
import cors from 'cors';
=======
import cookieParser from "cookie-parser";

>>>>>>> e591e38f60b0c3065b7846673963d78f469892c8
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
import { routerValidacion } from "./routes/verificacion.js";




// Inicializando la aplicacion.
const app = express();


//Utilizacion de credenciales temporales SSL
const credentials={
  key: fs.readFileSync('src/OpenSSL/certKey.key','utf-8'),
  cert: fs.readFileSync('src/OpenSSL/cert.crt','utf-8'),
}
const httpsS=https.createServer(credentials,app)

//inclusion de back api cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Reemplaza con el origen de tu aplicación Vue.js
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cors({
  origin: 'https://192.168.66.100:8081',///////////////////////////////////////////////////////////////////////////
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

// Iniciando el servidor
httpsS.listen(app.get("port"), () => {
  console.log(`server listen on port ${app.get("port")}`);
});