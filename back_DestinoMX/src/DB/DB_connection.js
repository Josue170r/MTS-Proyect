import mysql from "mysql";

// export const mySqlConnection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123456",
//   database: "mts_database",
//   port: "3345",
// });

export const mySqlConnectionProduction = mysql.createConnection({
  host: "roundhouse.proxy.rlwy.net",
  user: "root",
  password: "1gdBgfeDghGD53a6C2dDf-Ed31D2bE5H",
  database: "railway",
  port: "51052",
});

mySqlConnectionProduction.connect((err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connection sucessful");
  }
});
