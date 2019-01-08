const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(express.json());

app.get('/api', (req, res) => {
  return res.send('api working');
});

app.get('/api/quotes', (req, res) => {
  axios.get('http://positive-quotes.herokuapp.com/v1/quotes/random')
    .then(resp => res.send(resp.data));
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});