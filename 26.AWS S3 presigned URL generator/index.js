require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const port = 3500;

const {
  generateGetUrl,
  generatePutUrl
} = require('./AWSPresigner');

app.get('/generate-get-url', (req, res) => {
  // Both Key and ContentType are defined in the client side.
  // Key refers to the remote name of the file.
  const { Key } = req.query;
  generateGetUrl(Key)
    .then(getURL => {
      res.send({ getURL });
    })
    .catch(err => {
      res.send(err);
    });
});

app.get('/generate-put-url', (req,res)=>{
  // Both Key and ContentType are defined in the client side.
  // Key refers to the remote name of the file.
  // ContentType refers to the MIME content type, in this case image/jpeg
  const { Key, ContentType } =  req.query;
  generatePutUrl(Key, ContentType).then(putURL => {
    res.send({putURL});
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
