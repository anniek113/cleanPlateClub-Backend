require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sql = require("mysql2/promise");
const { response } = require("express");

const PORT = 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const pool = sql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

//POST user
app.post("/user", async (request, response) => {
  try {
    console.log("postuser");
    console.log([request.body.username, request.body.business]);

    if (!request.body.username || !request.body.business) {
      return response
        .status(400)
        .send({ message: "enter all required iformation" });
    }
    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      "INSERT INTO cleanplateclub.user (username, bussiness) VALUES (?,?)",
      [request.body.username, request.body.business]
    );
    con.release();
    console.log(queryResponse);
    response.status(200).send({ message: queryResponse });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

// GET ONE User at Login
app.get("/user", async (request, response) => {
  try {
    console.log("GET ONE USER");

    const con = await pool.getConnection();
    const recordset = await con.execute(
      "SELECT * FROM cleanplateclub.user WHERE username=?",
      [request.query.username]
    );
    con.release();

    console.log(recordset[0]);

    response.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message, message: error });
  }
});

//POST donation
app.post("/donate", async (request, response) => {
  try {
    console.log("postdonationinfo");

    const con = await pool.getConnection();
    const queryResponse = await con.execute(
      "INSERT INTO cleanplateclub.donate ( username, location, contact, foodtype, foodamount, expiration, foodpic) VALUES (?, ?, ?, ?, ?, ?, ?) ",
      [
        request.body,
        username,
        request.body.location ? request.body.location : null,
        request.body.contact ? request.body.contact : null,
        request.body.foodtype ? request.body.foodtype : null,
        request.body.foodamount ? request.body.foodamount : null,
        request.body.expiration ? request.body.expiration : null,
        request.body.foodpic ? request.body.foodpic : null,
      ]
    );
    con.release();
    console.log(queryResponse);

    response.status(200).send({ message: queryResponse });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
