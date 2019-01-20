const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const User = mongoose.model('User');

//GET current route (required, only authenticated users have access)
//working
router.get('/current', (req, res, next) => {
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
    return res.send("protected route working")
  })

module.exports = router;
