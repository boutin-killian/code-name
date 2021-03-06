const express = require("express");
const app = express();
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cors = require("cors");
let users = [];
var mongoose = require('mongoose');

const secret = "yeah-bad-secret-but-just-for-testing";

const DbManager = require("./src/utils/DbManager");
const db = DbManager();
const User = require("./models/User");
const Article = require("./models/Article");

app.use(cors());
app.use(express.json());

app.get("/favicon.ico", (req, res) => {
    res.status(204);
    return;
});

app.get("/", (req, res) => {
    res.json({message: "Server ON"});
    return;
});

app.post("/login", (req, res) => {
    const retrievedEmail = req.body.email;

    User.find({mail: retrievedEmail}, function (err, data) {
        if (err) {
            console.log(err);
            return
        }

        if (data.length === 0) {
            console.log("No record found")
            return res
                .status(401)
                .json({message: `No user with email ${retrievedEmail}`});
        } else {
            const password = req.body.password;
            console.log("pwd", data[0].pwd);
            const isMatchPassword = bcrypt.compareSync(password, data[0].pwd);
            console.log('is match', isMatchPassword);
            if (!isMatchPassword) {
                return res.json({message: `You used the wrong password`, status: '401'});
            } else {
                console.log("USER EXISTS");
                const payload = {
                    email: data[0].mail,
                };
                res.json({
                    token: jwt.sign(payload, secret),
                    user: data[0],
                    status: '200'
                });
                return;
            }
        }
    });


});

app.post("/register", (req, res) => {
    console.log("register / body", req.body);
    const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
    const retrievedEmail = req.body.email.trim();

    const user = new User({
        mail: retrievedEmail,
        pwd: encryptedPassword,
        fullname: req.body.name
    });

    // email address must be unique
    User.find({mail: retrievedEmail}, function (err, data) {
        if (err) {
            console.log(err);
            return
        }

        if (data.length === 0) {
            console.log("No record found");
            user.save((err, user) => {
                if (err) {
                    console.error(err);
                    //res.status(500).json({message: "Failed to save user"});
                    return;
                }
                return user;
            });
        } else {
            console.log("USER ALREADY EXISTS");
            res.json({message: `Conflict. User with ${retrievedEmail} already exists`, status: '401'});
            return;
        }

        const payload = {
            email: user.email,
            iat: Date.now(),
            role: "student"
        };
    
        res.json({
            token: jwt.sign(payload, secret),
            user: {name: req.body.name, email: req.body.email},
            status: '200'
        });
        return;

    });
    
});

app.get("/users", (req, res) => {
    console.log("/users");
    if (db) {
        User.find({})
            .sort({fullname: 1})
            .exec((err, users) => {
                if (err) {
                    return res
                        .status(500)
                        .json({message: "could not retrieve users"});
                }
                console.log("users", users);
                return res.status(200).json({users});
            });
    } else {
        res.status(500).json({message: "DB is NOT ready"});
        return;
    }
});

// ARTICLES
app.get("/articles", (req, res) => {

    if (db) {
        let userId = req.query.user;
        if (typeof (userId) === "undefined") {
            Article.find({})
                .sort({year: 0})
                .exec((err, articles) => {
                    if (err) {
                        return res
                            .status(500)
                            .json({message: "could not retrieve articles"});
                    }
                    articles = articles.filter( article => article.nbStock > 0);
                    return res.status(200).json({articles});
                });
        } else {
            Article.find({user: userId, nbStock: { $gt: 0 }})
                .sort({year: 0})
                .exec((err, articles) => {
                    if (err) {
                        return res
                            .status(500)
                            .json({message: "could not retrieve articles"});
                    }
                    return res.status(200).json({articles});
                });
        }
    } else {
        res.status(500).json({message: "DB is NOT ready"});
        return;
    }
});

app.post("/article", (req, res) => {

    if (typeof (req.body.title) !== "undefined") {
        const article = new Article({
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            year: req.body.year,
            price: req.body.price,
            type: req.body.type,
            image: req.body.image,
            user: req.body.user,
            nbSell: 0,
            nbStock: req.body.stock
        });

        article.save((err, article) => {
            if (err) {
                console.error(err);
                //res.status(500).json({message: "Failed to save user"});
                return;
            }
            return res.status(200).json({article});
        });

    } else {
        console.log("Aucune donnée transmise.");
    }
});

app.put("/articles", async (req, res) => {
    if (typeof (req.body._id) !== "undefined") {

        var article = Article.findOne({_id: req.body._id}).exec(async (err, articles) => {
            if (err) {
                return res
                    .status(500)
                    .json({message: "could not retrieve articles"});
            }
            var newNbSell = articles.nbSell + req.body.nbSell;
            var newNbStock = articles.nbStock - req.body.nbSell;
            let doc = await Article.findOneAndUpdate({ _id: req.body._id},{nbSell: newNbSell,nbStock: newNbStock}, {
                new: true
              });
            return res.status(200).json(doc.nbSell);
        });

    } else {
        console.log("Aucune donnée transmise.")
    }
});


app.get("/articles/:type", (req, res) => {
  var type  = req.params.type;
  console.log(type);
  if (db) {
      Article.find({type: type})
          .sort({year: 1})
          .exec((err, articles) => {
              if (err) {
                  return res
                      .status(500)
                      .json({message: "could not retrieve articles"});
              }
              articles = articles.filter( article => article.nbStock > 0);
              return res.status(200).json({articles});
          });
  } else {
      res.status(500).json({message: "DB is NOT ready"});
  }
});



const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});