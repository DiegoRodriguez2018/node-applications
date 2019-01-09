const express = require('express');

const router = new express.Router();

const stripes = (req, res, next) => {
    console.log("some stripes");
    next();
}

router.use(stripes);

router.get('/fergus', (req, res) => {
    return res.send("fergus");
})

router.get('/gerald', (req, res) => {
    return res.send("gerald");
})

router.get('/beryl',  (req, res) => {
    return res.send("beryl");
})



module.exports = router;