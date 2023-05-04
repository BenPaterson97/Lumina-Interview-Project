const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;

// pool data from database
const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "filmData",
  user: "postgres",
  password: "123test",
});

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// get the data
app.get("/get", (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
});

// post the data (create) **IMPORTANT: Currently not working (Proxy error: Could not proxy request /insert from...)**
app.post("/insert", (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const movieIDs = req.body.favourite_movies;
  console.log(req.body);

  pool.query(
    "INSERT INTO users (firstname, lastname, favourite_movies) VALUES (?,?,?)",
    [firstName, lastName, movieIDs],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      console.log(result.rows);
      res.json(result.rows);
    }
  );
});

// listen on port
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
