const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

require('./config/db'); // note we are just calling the code, we dont need to store it in a const. 
const User = require('./models/User');

const app = express();
const port = 3500;

app.use(express.json());

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['my-cookie-key']
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  User.findOne({ username })
    .then(doc => done(null, doc))
    .catch(err => done({myError: err}, null));
});

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Incorrect username' }); }
      if (user.password !== password) { return done(null, false, { message: 'Incorrect password' }); }
      done(null, user);
    });
  }
))

const isAuthenticated = (req, res, next) => {
  if(!req.user) {
    return res.status(403).send('Not authorized!');
  }
  next();
}

app.get('/', (req, res) => {
  res.send('api working');
});

app.get('/protected', isAuthenticated, (req, res) => {
  res.send('accessed protected resource');
});

app.get('/users', (req, res) => {
  User.find()
    .then(docs => res.send(docs));
});

app.get('/me', isAuthenticated, (req, res) => res.send(req.user));

const authenticateUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) { return res.status(401).send(info.message) }
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      return res.send('Successfully authenticated');
    });
  })(req, res, next);
}

app.post('/login', authenticateUser);

app.get('/logout', (req, res) => {
  req.logout();
  res.send('Successfully logged out');
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));