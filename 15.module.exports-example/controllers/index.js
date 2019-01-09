const express = require('express');
const router = new express.Router();

router.use('/zebra', require ('./zebra'));

module.exports =  router;