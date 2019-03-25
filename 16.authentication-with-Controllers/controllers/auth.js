const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");
//Note that headers are the best place to pass authentication info.
// Also is a good place to pass tokens

const generateToken = user => {
  console.log(user);

  //syntax:
  // const token = jwt.sign(
  //     {DATA},
  //     SECRET not to get published in github. This will help us to encrypt our data.
  // )

  //for now we are going to just use a string but for production we NEED to hide this in some kind of env variable.
  // note that SECRET nevers leaves the server

  const token = jwt.sign({ username: user.username }, "coder-academy", {
    expiresIn: "1h"
  });

  return token;
};

const isAuthenticated = (req, res) => {
  const { username, password } = req.body;
  console.log("username", ": ", username);
  console.log("password", ": ", password);
  if (username) {
    User.findOne({ username }).then(doc => {
      //magic happens here
      bcrypt.compare(password, doc.password, function(err, result) {
        if (result === false) {
          return res.status(401).send("Bad credentials");
        } else {
          console.log("yeah");

          // if the user exists and the password is right we arre going to generate a token and pass it in the response.
          const token = generateToken(doc); //note we are passing the mongo document
          return res.send(token);
        }
      });
    });
  } else {
    return res.status(401).send("Bad credentials");
  }
};

const register = (req, res) => {
  const { username, password } = req.body;
  if (username.length > 1 && password.length > 1) {
    // console.log('username',': ', username);
    // console.log('password',': ', password);

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      User.create({ username, password: hash });
    });

    return res.send(`User ${username} created`);
  } else {
    return res.status(401).send("Please enter username and password");
  }
};

const showUsers = (req, res) => {
  User.find({}).then(docs => {
    return res.send(docs);
  });
};

//this will match /auth/login
router.post("/login", isAuthenticated);

router.post("/signup", register);

router.get("/users", showUsers);

module.exports = router;
