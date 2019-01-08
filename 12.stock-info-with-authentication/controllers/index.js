const express = require('express');
const router = new express.Router();

router.use('/', require ('./public'));
//if is a protected route we use our protected.js file
router.use ('/protected', require('./protected'));

module.exports =  router;