const express = require('express');

const app = new express();
const port = 3000;

const users = [
  {
    username: 'jon',
    password: 'password',
    role: 'admin'
  },
  {
    username: 'gretchen',
    password: 'password',
    role: 'big boss'
  },
  {
    username: 'harrison',
    password: 'password',
    role: 'helpful'
  },
  {
    username: 'matt',
    password: 'password',
    role: 'food specialist'
  }
];

// this is some middleware we have been using
app.use(express.json());

//but we can write our own
// note that nextProcess its written often just like next, and in this case will be the call back of the app.get function. 
//if we dont call nextProcess(); (or next();) it will just get stuck in our custom middleware
app.use((req, res, nextProcess) => {
  console.log('running first middleware');
  req.didRunThroughMiddleware = 'we sure did!';
  nextProcess();
});

app.use((req, res, next) => {
  console.log('running second middleware');
  next();
});

//imagine we want to make sure that if the user sends are request they are authenticated

// We can use app.use(ourmiddleware) but that will run it in all the routes. 
// If we declare it as an arrow function and store it in a const we can run it just in the /auth route

const checkUser = (req, res, next) => {
  console.log('checking user')
  const { username, password } = req.body;
  console.log('username',': ', username);
  
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).send('user does not exist');
  }
  if (user.password !== password) {
    return res.status(401).send('password does not match');
  }
  req.user = user;
  next();
};

const moreMiddleware = (req, res, next) => {
  console.log('running yet another middleware function');
  next();
}

// app.use(checkUser());

app.get('/', (req, res) => {
  console.log(req.didRunThroughMiddleware);
  return res.send('hi from api');
});

app.post('/auth', checkUser, moreMiddleware, (req, res) => {
  return res.send(req.user)
});

const checkBigBoss = (req,res, next) => {
    console.log('checking big boss credentials')
    const {role} = req.user;
    console.log('role',': ', role);
    
    // const { username, password } = req.body;

    if (role !== "big boss") {
      return res.status(403).send('you have no rights');
    }
    next();
}



app.post('/big-boss-page', checkUser, checkBigBoss,  (req,res)=>{
    console.log("welcome big boss");
    return res.send('welcome big boss');
})


const checkNotHelpful = (req,res, next) => {
    console.log('checking not helpful user credentials')
    const {role} = req.user
    console.log('role',': ', role);    
    if (role==="helpful"){
      return res.status(402).send('you are too helpful');
    }
    next();
}

app.post('/not-helpful-page',checkUser, checkNotHelpful,  (req,res)=>{
    console.log("welcome not helpful user");
    return res.send('welcome not helpful user');
})

const checkAdminFoddies = (req,res, next) => {
    console.log('checking for admin or food specialist');
    const {role} = req.user
    console.log('role',': ', role);    
    if (role !== "admin" || role !== "food specialist"){
      return res.status(402).send('you know you dont have to be here');
    }
    next();
}

app.post('/admin-foddies-page',checkUser, checkAdminFoddies,  (req,res)=>{
    console.log("welcome admin or food specialist");
    return res.send("welcome admin or food specialist");
})


app.listen(port, () => console.log(`running on ${port}`));


// For the challenge please implement the following routes:
// 1. A new route that only someone with the role `big boss` is allowed to access - everyone else gets a `403: forbidden` response
// 2. A new route that only people with the role `helpful` cannot access - anyone with the role `helpful` should get a `402: You are too helpful!` response
// 3. A new route that people with the role `admin` or `food specialist` can access - everyone else gets a `405: You know you're not meant to be here` response
