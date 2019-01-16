const express = require('express');
const router = new express.Router();



router.get('/', (req, res) => {
    return res.send('api working');
});


router.get('/test', (req, res) => {
    return res.send('api test working');
});

module.exports=router;
