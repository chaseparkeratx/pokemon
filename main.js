// Type Chart
const typeChart = {
  normal: { superEffective: [], notEffective: ["rock", "steel"], immune: ["ghost"] },
  fire: { superEffective: ["grass", "ice", "bug", "steel"], notEffective: ["fire", "water", "rock", "dragon"], immune: [] },
  water: { superEffective: ["fire", "ground", "rock"], notEffective: ["water", "grass", "dragon"], immune: [] },
  electric: { superEffective: ["water", "flying"], notEffective: ["electric", "grass", "dragon"], immune: ["ground"] },
  grass: { superEffective: ["water", "ground", "rock"], notEffective: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"], immune: [] },
  ice: { superEffective: ["grass", "ground", "flying", "dragon"], notEffective: ["fire", "water", "ice", "steel"], immune: [] },
  fighting: { superEffective: ["normal", "ice", "rock", "dark", "steel"], notEffective: ["poison", "flying", "psychic", "bug", "fairy"], immune: ["ghost"] },
  poison: { superEffective: ["grass", "fairy"], notEffective: ["poison", "ground", "rock", "ghost"], immune: ["steel"] },
  ground: { superEffective: ["fire", "electric", "poison", "rock", "steel"], notEffective: ["grass", "bug"], immune: ["flying"] },
  flying: { superEffective: ["grass", "fighting", "bug"], notEffective: ["electric", "rock", "steel"], immune: [] },
  psychic: { superEffective: ["fighting", "poison"], notEffective: ["psychic", "steel"], immune: ["dark"] },
  bug: { superEffective: ["grass", "psychic", "dark"], notEffective: ["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"], immune: [] },
  rock: { superEffective: ["fire", "ice", "flying", "bug"], notEffective: ["fighting", "ground", "steel"], immune: [] },
  ghost: { superEffective: ["psychic", "ghost"], notEffective: ["dark"], immune: ["normal"] },
  dragon: { superEffective: ["dragon"], notEffective: ["steel"], immune: ["fairy"] },
  dark: { superEffective: ["psychic", "ghost"], notEffective: ["fighting", "dark", "fairy"], immune: [] },
  steel: { superEffective: ["ice", "rock", "fairy"], notEffective: ["fire", "water", "electric", "steel"], immune: [] },
  fairy: { superEffective: ["fighting", "dragon", "dark"], notEffective: ["fire", "poison", "steel"], immune: [] },
};

// Function to determine the winning Pokémon based on type effectiveness
function determineWinner(selectedTypes, opponentTypes) {
  let effectiveness = 1;
  for (let type of selectedTypes) {
    for (let opponentType of opponentTypes) {
      if (typeChart[type].superEffective.includes(opponentType)) {
        effectiveness *= 2;
      } else if (typeChart[type].notEffective.includes(opponentType)) {
        effectiveness *= 0.5;
      } else if (typeChart[type].immune.includes(opponentType)) {
        effectiveness *= 0;
      }
    }
  }

  if (effectiveness > 1) {
    return "Your Pokémon is likely to win the battle!";
  } else if (effectiveness < 1) {
    return "Your Pokémon is likely to lose the battle!";
  } else {
    return "The battle is likely to be a tie!";
  }
}

// Function to fetch Pokémon data and update the DOM
async function fetchPokemonData(pokemonNumber) {
  const select = document.getElementById(`pokemon-select${pokemonNumber}`);
  const pokemonInfo = document.getElementById(`pokemon-info${pokemonNumber}`);
  const pokemonName = select.value.toLowerCase();

  if (pokemonName.trim() === "") {
    alert(`Please select a Pokémon for Pokémon ${pokemonNumber}.`);
    return;
  }

  let imageUrl = ''; // Initialize imageUrl variable

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error("Pokémon not found.");
    }
    const data = await response.json();

    // Extract the required data
    const name = data.name;
    const abilities = data.abilities.map(ability => ability.ability.name);
    const type = data.types.map(type => type.type.name);
    const moves = data.moves.slice(0, 4).map(move => move.move.name); // Limit to 4 moves
    imageUrl = data.sprites.front_default; // Update imageUrl value

    // Update the DOM with the retrieved data
    pokemonInfo.innerHTML = `
      <h2>${name}</h2>
      <img src="${imageUrl}" alt="${name}">
      <p><strong>Abilities:</strong> ${abilities.join(", ")}</p>
      <p><strong>Type:</strong> ${type.join(", ")}</p>
      <p><strong>Moves:</strong> ${moves.join(", ")}</p>
    `;

    // Get the types of the selected Pokémon
    const selectedPokemonTypes = type.map(type => type.toLowerCase());

    // Determine the winning Pokémon based on type effectiveness
    const opponentPokemonNumber = pokemonNumber === 1 ? 2 : 1;
    const opponentSelect = document.getElementById(`pokemon-select${opponentPokemonNumber}`);
    const opponentPokemonType = opponentSelect.value.toLowerCase();
    const winnerText = determineWinner(selectedPokemonTypes, [opponentPokemonType]);

    // Display the result on the DOM
    const resultContainer = document.getElementById('battle-result');
    resultContainer.textContent = winnerText;
  } catch (error) {
    console.log("Error:", error.message);
    pokemonInfo.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// Fetch Pokémon names and populate the dropdown options
async function fetchPokemonNames() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
  const data = await response.json();
  const pokemonNames = data.results.map(pokemon => pokemon.name);

  // Populate the dropdown options
  const select1 = document.getElementById('pokemon-select1');
  const select2 = document.getElementById('pokemon-select2');
  for (let name of pokemonNames) {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.value = name;
    option2.value = name;
    option1.textContent = name;
    option2.textContent = name;
    select1.appendChild(option1);
    select2.appendChild(option2);
  }
}

// Call the fetchPokemonNames function to populate the dropdown options
fetchPokemonNames();