const renderAbilities = (poke) => {
  const panel = document.querySelector('#poke-info');
  const ul = `<ul id="abilities"></ul>`;
  panel.insertAdjacentHTML('beforeend', ul);
  const ulElement = document.querySelector('#abilities');
  poke.abilities.forEach(ability => {
    ulElement.insertAdjacentHTML('beforeend', `<li>${ability.ability.name}</li>`);
  });
}

const renderPokemon = (poke) => {
  console.log(poke)
  const panel = document.querySelector('#poke-info');
  const pokeInfo = `
    <h1>${poke.id}: ${poke.name}</h1>
    <img src="${poke.sprites.front_default}" />
    <p>Weight: ${poke.weight} | Height: ${poke.height}</p>
  `;
  panel.insertAdjacentHTML('beforeend', pokeInfo);
  renderAbilities(poke);
}

const getId = () => {
  const queryParams = window.location.search;
  const id = queryParams.substr(1);
  return id;
}

const fetchInfo = () => {
  const id = getId();
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  fetch(url)
    .then(resp => resp.json())
    .then(json => renderPokemon(json))
    .catch(error => console.error(error));
}

fetchInfo();