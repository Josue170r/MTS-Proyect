import mysql from 'mysql';

export const mySqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "mts_database",
});

mySqlConnection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connection sucessful");
  }
});
