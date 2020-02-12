const express = require("express");
const app = express();
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cors = require("cors");

let users = [];
const secret = "yeah-bad-secret-but-just-for-testing";
const DbManager = require("./src/utils/DbManager");
const db = DbManager();
const User = require("./models/User");

app.use(cors());
app.use(express.json());

app.get("/favicon.ico", (req, res) => {
  res.status(204);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello server" });
});

app.post("/login", (req, res) => {
  console.log("login / body", req.body);
  const retrievedEmail = req.body.email;
  const user = users.find(user => user.email === retrievedEmail);
  if (!user) {
    return res
      .status(401)
      .json({ message: `No user with email ${retrievedEmail}` });
  }
  const password = req.body.password;
  const isMatchPassword = bcrypt.compareSync(password, user.password);
  if (!isMatchPassword) {
    return res.status(401).json({ message: `${password} is a wrong password` });
  }
  const payload = {
    email: user.email,
    iat: Date.now(),
    role: "student"
  };
  res.json({
    token: jwt.sign(payload, secret),
    user: { name: req.body.name, email: req.body.email }
  });
});

app.post("/register", (req, res) => {
    console.log("register / body", req.body);
    const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
    const retrievedEmail = req.body.email.trim();

    const user = {
      email: retrievedEmail,
      password: encryptedPassword,
      name: req.body.name
    };

    // email address must be unique
    const userIndex = users.findIndex(user => user.email === retrievedEmail);
    console.log("userIndex", userIndex);
    if (userIndex !== -1) {
      return res.status(422).json({
        message: `Conflict. User with ${retrievedEmail} already exists`
      });
    }
    users = [...users, user];
    console.log("users", users);
    const payload = {
      email: user.email,
      iat: Date.now(),
      role: "student"
    };

    res.json({
      token: jwt.sign(payload, secret),
      user: { name: req.body.name, email: req.body.email }
    });
  });

  app.get("/users", (req,res) => {
    console.log("/users");
    if (db) {
      User.find({})
        .sort({ fullname: 1 })
        .limit(3)
        .exec((err, users) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "could not retrieve users" });
          }
          console.log("users", users);
          return res.status(200).json({ users });
        });
    } else {
      res.status(500).json({ message: "DB is NOT ready" });
    }
  });

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});