const passport = require('passport');
const mongoose = require('mongoose');

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

const strategy = new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (err, dbUser) => {
    if (err) {
      //In case of server error:
      return done(err)
      //done(error, user, info);
    }
    if (!dbUser) {
      return done(null, null, { message: "Incorrect credentiasl" })
    }
    //note that validatePassport is defined in UserSchema
    if (!dbUser.validatePassword(password)) {
      return done(null, null, { message: "Incorrect credentials" })
    }
    return done(null, dbUser)
  })
  // Note we can do the same with promise syntax, but callback syntax is a bit more clear. 
})

passport.use(strategy);