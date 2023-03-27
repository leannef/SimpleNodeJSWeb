const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123",
  database: "loginSystem",
});

app.listen(3001, () => {
  console.log("running server on port 3001");
});

app.post("/sign-up", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
    db.query(
      "INSERT INTO user (username, password) VALUES (?,?)",
      [username, password],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result) {
          res.send({ message: "registered successful!" });
        }
      }
    );
});

app.post("/sign-in", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user WHERE username = ? AND password = ?;",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        console.log("Backend: successful username/password.")
        _username = result[0].username;
        res.send(result);
      } else {
        res.send({ message: "Wrong username/password combination!" });
      }
 
    }
  );
});

app.get("/home", (req, res) => {
  db.query("SELECT * FROM comments;",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      console.log("send comments to front end..");
      res.send(result);
    });
});

app.post("/home", (req, res) => {
  const username = req.body.username;
  const text = req.body.text;
  db.query("INSERT INTO comments (name, text) VALUES (?, ?)",
    [username, text],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      console.log("posted comment added to database");
      if (result) {
        res.send({ message: "post successful!" });
      }
    });
});

app.delete("/home", (req, res) => {
  const comment_id = req.body.data;
  db.query("DELETE FROM comments WHERE comment_id = ? ",
    comment_id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      console.log("delete comment from database");
      if (result) {
        res.send({ message: "delete successful!" });
      }
    });
});
