require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const port = 3500;

app.get('/file-upload', (req,res)=>{
  const { Key, ContentType } =  req.query;

  const getSignedPutUrl = require('./signedPutUrl');
  
  const Bucket = process.env.BUCKET;
  const params = { Bucket, Key, ContentType }
  
  getSignedPutUrl(params).then(putUrl => {
    const data = {
      putUrl,
      params
    }
    res.send(data);
  });
})

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
});