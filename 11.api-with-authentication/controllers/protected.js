const express = require('express');
const router = new express.Router();

const User = require('../models/User')

//Note that headers are the best place to pass authentication info. 
// Also is a good place to pass tokens

const isAuthenticated = (req,res, next) => {
    const { username, password } = req.headers;
    console.log('username',': ', username);
    console.log('password',': ', password);
    
    if (username) {
        User.findOne({ username })
            .then(doc => {
                if (doc.password !== password) {
                    return res.status(401).send('Bad credentials');
                }else{
                    next();
                }
            })
    } else {
        return res.status(401).send('Bad credentials');
    }
}

//by doint this we are going to use isAuthenticated in all our routes defined in this file. 
router.use(isAuthenticated);

router.post('/', (req,res) => {
    const { username } = req.headers;
    return res.send(`Authenticated! Welcome ${username}`);

})


router.get('/', (req, res) => {
    return res.send('You have accessed the protected resources');
})



module.exports = router;