import mysql from "mysql2";

export const mySqlConnection = mysql.createConnection({
  host: "viaduct.proxy.rlwy.net",
  user: "root",
  password: "5e-f4da5bF1fH214BE542fgegDF3g15d",
  database: "mts_database",
  port: "37624",
});

mySqlConnection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connection sucessful");
  }
});
