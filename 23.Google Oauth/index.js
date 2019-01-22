const express = require('express'),
    app = express(),
    passport = require('passport'),
    configPassport = require('./configPassport'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session');


configPassport(passport);
app.use(passport.initialize());
app.use(express.json());

app.use(cookieSession({
    name: 'session',
    keys: ['SECRECT KEY'],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(cookieParser()); //populates req.cookies with the header parsed cookie, or populates req.secret if a secret string is used.

app.get('/', (req, res) => {
    console.log('req.session.token',': ', req.session.token);
    
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set'
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
});

//TODO: add a controller and this logic can be performed by middleware.
app.get('/protected', (req,res)=>{
    if (req.session.token) {

        res.send("you have access to the protected resources");
    } else {
        res.send("sorry you dont have access to the protected resources");
    }

})

app.get('/profile', (req,res)=>{
    console.log("profile");
    
    
    if (req.session.token) {
        const {user} = req.session.passport
        console.log('req.session',': ', req.session);
        
        
        res.send(user.profile);
    } else {
        res.send("Sorry you need to sign in.");
    }

})

app.get('/logout', (req, res) => {
    // req.logout() is a passport method that terminates the login session
    req.logout();
    // req.session=null destroys the cookie-session :        
    req.session = null;
    // redirecting to root
    res.redirect('/');
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        console.log(req.user.token);
        req.session.token = req.user.token;
        res.redirect('/');
    }
);

const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log('Server is running on port', port);
});