const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

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
      if (doc.password !== password) {
        return res.status(401).send("Bad credentials");
      } else {
        // if the user exists and the password is right we arre going to generate a token and pass it in the response.
        const token = generateToken(doc); //note we are passing the mongo document

        return res.send(token);
      }
    });
  } else {
    return res.status(401).send("Bad credentials");
  }
};

//this will match /auth/login
router.post("/login", isAuthenticated);

module.exports = router;
