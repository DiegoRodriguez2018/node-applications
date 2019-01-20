const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');


//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(express.json());

app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

//Configure Mongoose
mongoose.connect('mongodb://localhost/passport-tutorial');
mongoose.set('debug', true);

//Models & routes
require('./models/User');

// Configuring passport:

const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = mongoose.model('User');



passport.use(new LocalStrategy({
  usernameField: 'user[username]',
  passwordField: 'user[password]',
}, (username, password, done) => {
  User.findOne({ username })
    .then((user) => {

      console.log('user',': ', user);
            
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'username or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch((error)=>{
      console.log("Error occured while finding user in db.");
      
      done(error)
    });
}));

// 



app.use(require('./controllers'));

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

const port = process.env.PORT || 3500;
app.listen(port, () => console.log('Server running on port',port));