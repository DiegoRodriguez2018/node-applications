const express = require('express');
const app = express();

const pokemon = [
  {
    id: 1,
    name: 'pikachu'
  },
  {
    id: 2,
    name: 'raichu'
  },
  {
    id: 53,
    name: 'poliwag'
  },
];

app.use(express.json());

app.get('/', (req, res) => {
  return res.send('Hello world. From API');
});

// get '/pokemon' to controller#action
app.get('/pokemon', (req, res) => {
  return res.send(pokemon);
});

app.get('/pokemon/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const poke = pokemon.find(p => p.id === id);
  if (!poke) {
    // STATUS CODES:
    // 200 range - all good
    // 300 range - redirected
    // 400 range - user error
    // 500 range - server error
    return res.status(404).send('Pokemon not found!');
  }
  return res.send(poke);
});

app.post('/pokemon', (req, res) => {
  // ADD A NEW POKEMON TO OUR ARRAY
  // 1. get params from req body
  const id = req.body.id;
  const name = req.body.name;
  // 2. add to array
  const poke = { id: id, name: name };
  pokemon.push(poke);
  // 3. send new pokemon as response
  return res.send(poke);
});

app.put('/pokemon/:id', (req, res) => {
  // TODO: Implement a PUT endpoint to update a pokemon in the array
});

app.delete('/pokemon/:id', (req, res) => {
  // TODO: Implement a DELETE endpoint to delete a pokemon from the array
});

app.listen(5000, () => {
  console.log('listening on port 5000');
});