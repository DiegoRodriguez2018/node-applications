const express = require('express');
const router = new express.Router();
const axios = require('axios');

const User = require('../models/User')

//Note that headers are the best place to pass authentication info. 
// Also is a good place to pass tokens

const isAuthenticated = (req, res, next) => {
    const { username, password } = req.headers;
    console.log('username', ': ', username);
    console.log('password', ': ', password);

    if (username) {
        User.findOne({ username })
            .then(doc => {
                if (doc.password !== password) {
                    return res.status(401).send('Bad credentials');
                } else {
                    next();
                }
            })
    } else {
        return res.status(401).send('Bad credentials');
    }
}

//by doint this we are going to use isAuthenticated in all our routes defined in this file. 
router.use(isAuthenticated);

router.post('/', (req, res) => {
    const { username } = req.headers;
    return res.send(`Authenticated! Welcome ${username}`);

})


router.get('/', (req, res) => {
    return res.send('You have accessed the protected resources');
})

const getData = (req, res, next) => {
    const url = 'https://api.iextrading.com/1.0/stock/aapl/batch?types=quote,news,chart&range=1m&last=10';

    axios.get(url)
        .then(info => {
            res.info = info.data;
            next();
        }
        );
    console.log("getting data");
}


router.get('/stocks', getData, (req, res) => {

    console.log (res.info);
    return res.send(res.info);

})

module.exports = router;