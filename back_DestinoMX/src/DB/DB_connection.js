import mysql from "mysql";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER
} from "../config/config.js";

console.log("DB_HOST:", DB_HOST);
console.log("DB_USER:", DB_USER);
console.log("DB_PASSWORD:", DB_PASSWORD);
console.log("DB_NAME:", DB_NAME);
console.log("DB_PORT:", DB_PORT);

export const mySqlConnection = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});