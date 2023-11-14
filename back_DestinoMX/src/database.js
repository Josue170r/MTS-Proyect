import mysql from 'mysql';

export const mySqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "diego234Zarate@1223",
  database: "mts_database",
  port: "3345",
});

mySqlConnection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connection sucessful");
  }
});
