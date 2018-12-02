const renderPokemon = (pokemon) => {
  const list = document.querySelector('#pokemon-list');
  pokemon.forEach((poke, index) => {
    const panel = `
      <li>
        <a href="poke-info.html?${index + 1}">
          <p>${poke.name}</p>
        </a>
      </li>
    `;
    list.insertAdjacentHTML('beforeend', panel)
  })
}

const url = 'https://pokeapi.co/api/v2/pokemon/';
fetch(url)
  .then((resp) => resp.json())
  .then(json => {
    const actualPokemon = json.results.slice(0, 151);
    renderPokemon(actualPokemon);
  })
  .catch((error) => console.error(error))
