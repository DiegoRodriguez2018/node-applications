const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('./auth');
const User = mongoose.model('User');

//POST new user route (optional, everyone has access)
router.post('/register', auth.optional, (req, res, next) => {
  const user = req.body;        
  console.log('user',': ', user);
  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }
  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  //creating a new instance of user
  const newUser = new User(user);
  //hashing password
  newUser.hashPassword(user.password);
  //saving and returning token
  return newUser.save()
    .then(() => res.json({ user: newUser.toAuthJSON() }));
});




//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  // const { body: { user } } = req;
  const user = req.body
  console.log('user',': ', user);
  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }
  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }
    console.log('passportUser',': ', passportUser);
    
    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.status(400).send(info);
  })(req, res, next);
});



//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return User.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});


router.get('/', (req,res)=>{
  return res.send("users route working")
})

module.exports = router;