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
const Article = require("./models/Article");

app.use(cors());
app.use(express.json());

app.get("/favicon.ico", (req, res) => {
    res.status(204);
});

app.get("/", (req, res) => {
    res.json({message: "Server ON"});
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
            if (!isMatchPassword) {
                return res.status(401).json({message: `${password} is a wrong password`});
            } else {
                console.log("USER EXISTS");
                const payload = {
                    email: data[0].mail,
                };
                res.json({
                    token: jwt.sign(payload, secret),
                    user: {fullname: data[0].fullname, mail: req.body.email}
                });
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
            //res.status(422).json({message: `Conflict. User with ${retrievedEmail} already exists`});
            return;
        }

    });

    const payload = {
        email: user.email,
        iat: Date.now(),
        role: "student"
    };

    res.json({
        token: jwt.sign(payload, secret),
        user: {name: req.body.name, email: req.body.email}
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
    }
});

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
                    return res.status(200).json({articles});
                });
        } else {
            Article.find({user: userId})
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
    }
});

app.post("/article", (req, res) => {

    if (typeof (req.body.title) !== "undefined") {
        const article = new Article({
            title: req.body.title,
            year: req.body.year,
            price: req.body.price,
            type: req.body.type,
            image: req.body.image,
            user: req.body.user,
            nbSell: 0
        });

        article.save((err, article) => {
            if (err) {
                console.error(err);
                //res.status(500).json({message: "Failed to save user"});
                return;
            }
            return article;
        });
        if (db) {
            Article.find({})
                .sort({year: 0})
                .exec((err, articles) => {
                    if (err) {
                        return res
                            .status(500)
                            .json({message: "could not retrieve articles"});
                    }
                    console.log("articles", articles);
                    return res.status(200).json({articles});
                });
        } else {
            res.status(500).json({message: "DB is NOT ready"});
        }

    } else {
        console.log("Aucune donnée transmise.")
    }
});

/*Article.find({user: retrievedEmail}, function (err, data) {
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
        if (!isMatchPassword) {
            return res.status(401).json({message: `${password} is a wrong password`});
        } else {
            console.log("USER EXISTS");
            console.log(data[0].fullname);
            const payload = {
                email: data[0].mail,
                iat: Date.now(),
                role: "student"
            };
            res.json({
                token: jwt.sign(payload, secret),
                user: {fullname: req.body.name, mail: req.body.email}
            });
        }
    }
});*/

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});