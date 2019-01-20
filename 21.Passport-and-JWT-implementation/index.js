const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const passport = require('passport');

//Configure Mongoose
mongoose.connect('mongodb://localhost/passport-database');
mongoose.set('debug', true);// enable logging collection methods + arguments to the console

//Models 
require('./models/User');

//Initiate our app
const app = express();
//Configure our app
app.use(cors());
app.use(express.json());

//Configuring express-session
const duration = 60 * 1000; //1 min
const session = expressSession({ secret: 'passport-database', cookie: { maxAge: duration }, resave: false, saveUninitialized: false }) 

app.use(session);

//Initializing passport
app.use(passport.initialize());
app.use(passport.session());

//Passport Configuration:
require('./passport-configuration');

app.use(require('./controllers'));

const port = process.env.PORT || 3500;
app.listen(port, () => console.log('Server running on port',port));