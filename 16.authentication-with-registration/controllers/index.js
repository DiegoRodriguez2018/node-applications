const express = require('express');
const router = new express.Router();

router.use('/', require ('./public'));
//if is a protected route we use our protected.js file
router.use ('/protected', require('./protected'));

//Authentication and JSON web tokens:
router.use ('/auth', require('./auth'));

module.exports =  router;