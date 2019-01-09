const express = require('express');
const router = new express.Router();
const jwt = require('jsonwebtoken');

//Note that headers are the best place to pass authentication info. 
// Also is a good place to pass tokens

//because we are implemnting tokens inn auth.js now we can just check for the token isAuthenticated:
const isAuthenticated = (req,res, next) => {
    const {token}  = req.headers;
    //to validate a token we call the verify method:
    const SECRET = 'coder-academy'; // note this is just for demonstration proposes, we need to store this in some kind of env variable. 
    const decoded = jwt.verify(token, SECRET);
    // jwt.verify will return a decoded version of the token with the data we sent in it. 

    console.log(decoded);
    next();
}

//by doint this we are going to use isAuthenticated in all our routes defined in this file. 
// router.use(isAuthenticated);

router.post('/', isAuthenticated, (req,res) => {
    const { username } = req.headers;
    return res.send(`Authenticated! Welcome ${username}`);

})


router.get('/', (req, res) => {
    return res.send('You have accessed the protected resources');
})



module.exports = router;