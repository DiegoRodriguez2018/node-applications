const express = require('express');
const cors = require('cors');

//Configure Mongoose
// mongoose.connect('mongodb://localhost/passport-database');
require('./dbConfig');

const Recipe = require('./models/Recipe')
//Initiate our app
const app = express();
//Configure our app
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    Recipe.find({})
    .then((doc)=>{
        res.send(doc);
    })
    .catch(err=> res.send(err))
})

const port = process.env.PORT || 3500;
app.listen(port, () => console.log('Server running on port',port));