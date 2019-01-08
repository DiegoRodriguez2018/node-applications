var express = require('express')
var router = express.Router()

console.log("yah");

const hola = (req,res,next)=>{
  console.log("hola");
  
  next()
}
// middleware that is specific to this router
router.use(hola)
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router