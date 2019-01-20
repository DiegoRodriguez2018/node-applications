const router = require('express').Router();

router.get('/', (req,res)=>{
    return res.send("public route working")
  })

module.exports = router;
