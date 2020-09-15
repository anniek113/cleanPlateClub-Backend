require("dotenv").config();
const sql = require("mysql2/promise");

const pool = sql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// (async function testConnection() {
//   try {
//     const conn = await pool.getConnection();
//     console.log("Connection Successful");
//     conn.release();
//   } catch (error) {
//     console.log(error);
//   }
// })();

// (async function createUserTable() {
//   try {
//     const conn = await pool.getConnection();

//     conn.query("CREATE DATABASE IF NOT EXISTS cleanplateclub");
//     conn.query("USE cleanplateclub");

//     const userDB = await conn.query(
//       "CREATE TABLE IF NOT EXISTS user (username VARCHAR(255) UNIQUE NOT NULL, bussiness VARCHAR(255) NOT NULL, PRIMARY KEY(username) )"
//     );
//     console.log(userDB);
//     conn.release();
//   } catch (error) {
//     console.log(error);
//   }
// })();

(async function createUserTable() {
  try {
    const conn = await pool.getConnection();
    conn.query("CREATE DATABASE IF NOT EXISTS cleanplateclub");
    conn.query("USE cleanplateclub");

    const donateDB = await conn.query(
      "CREATE TABLE IF NOT EXISTS donate (id INT UNIQUE NOT NULL AUTO_INCREMENT, username VARCHAR(255), location VARCHAR(255), contact VARCHAR(255), foodtype VARCHAR(255), foodamount VARCHAR(255), expiration VARCHAR(255), foodpic VARCHAR(255), PRIMARY KEY(id), FOREIGN KEY(username) REFERENCES user(username) )"
    );
    console.log(donateDB);
    conn.release();
  } catch (error) {
    console.log(error);
  }
})();

(async function createTeacherTable() {
  try {
    const conn = await pool.getConnection();
    conn.query("CREATE DATABASE IF NOT EXISTS cleanplateclub");
    conn.query("USE cleanplateclub");

    const claimDB = await conn.query(
      "CREATE TABLE IF NOT EXISTS claim (id INT UNIQUE NOT NULL AUTO_INCREMENT, username VARCHAR(255), location VARCHAR(255), charity VARCHAR(255), pickup VARCHAR(10), contact VARCHAR(255), profilepic VARCHAR(255), PRIMARY KEY(id), FOREIGN KEY(username) REFERENCES user(username) )"
    );
    console.log(claimDB);
    conn.release();
  } catch (error) {
    console.log(error);
  }
})();
