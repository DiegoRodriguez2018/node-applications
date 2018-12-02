const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pokedex');

mongoose.connection.on('connected', () => {
  console.log('connected to mongod');
});

mongoose.connection.on('error', () => {
  console.log('failed to connect to mongod');
});

const Pokemon = require('./models/pokemon');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/pokemon', (req, res) => {
  // return all pokemon
  Pokemon.find({})
    .then(doc => res.send(doc));
});

app.get('/pokemon/:id', (req, res) => {
  // return one pokemon
  const { id } = req.params;
  Pokemon.findOne({ id })
    .then(doc => res.send(doc));
});

app.post('/pokemon', (req, res) => {
  // create a new pokemon
  const { id, name } = req.body;
  const pokemon = new Pokemon({
    id,
    name
  });
  pokemon.save()
    .then(doc => res.send(doc));
});

app.put('/pokemon/:id', (req, res) => {
  // update one pokemon
  const { id } = req.params;
  const { name } = req.body;
  // const pokemon = Pokemon.findOne({ id })
  //   .then(doc => {
  //     doc.name = name;
  //     doc.save()
  //       .then(newDoc => res.send(newDoc))
  //   })
  Pokemon.findOneAndUpdate(
    { id },
    { name },
    {
      new: true,
      runValidators: true
    }
  ).then(doc => res.send(doc));
});

app.delete('/pokemon/:id', (req, res) => {
  // remove specific pokemon
  const { id } = req.params;
  Pokemon.findOneAndRemove({ id })
    .then(doc => res.send(doc));
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});