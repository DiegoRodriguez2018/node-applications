const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

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
app.use(session({ secret: 'passport-database', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

//Initializing passport
app.use(passport.initialize());
app.use(passport.session());

//SERIALIZING  the user username (we could also serialize the id)
passport.serializeUser((user, done) => {
  done(null, user.username);
})

//DESERIALIZING the user by username (we could do it by id as well)
passport.deserializeUser((username, done) => {
  User.findOne({ username })
      .then(doc => done(null, doc))
      .catch(err => done(err, null))
})

// Configuring passport:
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


const port = process.env.PORT || 3500;
app.listen(port, () => console.log('Server running on port',port));