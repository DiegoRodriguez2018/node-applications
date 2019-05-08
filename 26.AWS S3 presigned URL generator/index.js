require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const port = 3500;

app.get('/generate-get-url', (req,res)=>{
  // Both Key and ContentType are defined in the client side.
  // Key refers to the remote name of the file.
  // ContentType refers to the MIME content type, in this case image/jpeg
  const { Key, ContentType } =  req.query;
  const getSignedPutUrl = require('./generateAWSputUrl');
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

// app.get('/generate-put-url', (req,res)=>{
//   const { Key, ContentType } =  req.query;
//   const getSignedPutUrl = require('./generateAWSput');
//   const Bucket = process.env.BUCKET;
//   const params = { Bucket, Key, ContentType }
//   getSignedPutUrl(params).then(putUrl => {
//     const data = {
//       putUrl,
//       params
//     }
//     res.send(data);
//   });
// })

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
});