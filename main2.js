
const fetchPokemonNames = () => {
  return fetch('https://pokeapi.co/api/v2/pokemon?offset=100&limit=20')
  .then(response => response.json())
  .then(name => {
    const pokemonNames = name.results.map(pokemon => pokemon.name)
      
    const select1 = document.getElementById('player1');
    const select2 = document.getElementById('player2');
    for (let name of pokemonNames) {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.value = name;
      option2.value = name;
      option1.textContent = name.toUpperCase();
      option2.textContent = name.toUpperCase();
      select1.appendChild(option1);
      select2.appendChild(option2);
      }
    })
  }
  fetchPokemonNames()

const fetchPokemonData = (pokemonNumber) => {
  const select = document.getElementsByClassName(`select${pokemonNumber}`)
  let imageUrl = ''

  const pokemonImage = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${select}`)
    .then(response => response.json())
    .then(imageUrl = data.sprites.other.dream_world.front_default)
  const pokemonName = select.toUpperCase()
  const type = data.types.map(type => type.type.name)
  imageUrl = data.sprites.other.dream_world.front_default
  select.innerHTML = 
  `<h2>${name}</h2>
  <img src="${imageUrl}" alt="${name}">
  <p><strong>Type:</strong> ${type.join(", ")}</p>`  
}
}
fetchPokemonData()
  
  