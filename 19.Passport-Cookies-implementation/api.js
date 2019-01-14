const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const LocalStrategy = require('passport-local').Strategy; //we are importing just the Strategy

//configuring mongoose 
require('./config/db');

const app = express();
const port = 3500;
app.use(cors());
//by doing this here we are telling express to use express.json() in all the app. 
app.use(express.json());
const User = require('./models/User');

// SETTING UP PASSPORT:
// We need to:
//setup sessions for users, we need to know what user is login and be able to send back a cookie for that user. 
// tell passport how to serialize and deserialize the user. 
// initalize passport 
// tell passport how to authenticate with local strategy. 
// implemnent a custom authenticate callback to control response messages. 

//using dotenv:

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}            

// to use the env variable we just type:  process.env.VARIABLE

//CREATING A SESSION
const oneDay = 1000 * 60 * 60 * 24; //note that maxAge takes an integer in miliseconds. 
const cookie = cookieSession({
    maxAge: oneDay, // how many ms this cookie will be valid for. 
    keys: [process.env.COOKIE_SECRET_KEY]// keys is gonna be a secret that will tell us how to serialize our cookie, you dont want to push to github. Its a good idea to come with a random string of characters, as long as confusing as possible, and then store it in an .env file. 
});
//now we can use this cookie as part of our session

//INITIALIZING PASSPORT:
app.use(cookie);
app.use(passport.initialize());
app.use(passport.session());

//SERIALIZING  the user
passport.serializeUser((user, done) => {
    //we need to tell passport what will be done()
    done(null, user.username);
    //done (ERROR, user, INFO);
    //as a convention the first paramter is an error, the second the user, and the third will be info. 

    // note in this case the ERROR is null but we can pass a string or an new Error instance. 

    //passport instead of returning the response it passes the error to the next middleware. 
})

//DESERIALIZING the user:
//this process takes the cookie identifier (username) and turn into a in-memory object. 
passport.deserializeUser((username, done) => {
    User.findOne({ username })
        .then(doc => done(null, doc))
        .catch(err => done(err, null))
    // note that if we find the doc we pass it in the second paramater and null as an error in the first parameter.
    // if there is an error we pass it in the first parameter, and we send null as the user 
})

//SETTING UP LOCAL STRATEGY
// we tell passport how to deal with the input. 
passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err) {
                //SERVER ERROR.
                return done(err)
                //remember arguments order: done(error,user, info);
            }
            if (!user) {
                return done(null, null, { message: "Incorrect username" })
            }
            if (user.password !== password) {
                return done(null, null, { message: "Incorrect password" })
            }
            return done(null, user)
        })
        // note you can do this with the promise syntax as well but the callback is a bit more clear. 
    }
))

//note that done is like next in middleware, actually you can call it next and it will work as well. just a name. 

// the next thing in this case will be authenticate user

const authenticateUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {// if passport user object does not exist. 
            res.status(401).send(info.message); //this comes from our LocalStrategy setup
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.send(`Successfully authenticated. Welcome ${req.user.username}`)
        })
    })(req, res, next);
    //note we dont have access to req, res and next if we dont bind it. to bind it we just invoke it and pass req, res and next as arguments. 
}

//isAuthenticated middleware does only one thing: 
// Checks that there is an user (cookie). If there is not sends back an error. If there is calls next();
const isAuthenticated = (req, res, next) => {
    console.log('req.user', ': ', req.user);
    if (!req.user) {
        return res.status(403).send('Not authorised, please login.')
    }
    next();
}

//USING PASSPORT:
//After implementing passport, logging in,  accessing the user data and loggin out is easy. 

//LOGIN
app.post('/login', authenticateUser);

//SENDING BACK USER DATA
// Note this path will display the info of the user that has logged in. 
app.get('/me', isAuthenticated, (req, res) => {
    res.send(req.user); 
})

//LOGOUT :
app.get('/logout', isAuthenticated, (req, res) => {
    const { username } = req.user;
    req.logout();
    res.send(`${username} Successfully logged out.`)
})

// Protected resources:
app.get('/protected', isAuthenticated, (req, res) => {
    res.send('accessed protected resource');
});

// A GET request just to enable us to see all the users: 
app.get('/users', (req, res) => {
    User.find({})
        .then(doc => res.send(doc))
})

app.listen(port, () => {
    console.log(`listening on ${port}`);
});