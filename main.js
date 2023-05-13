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
    } catch (error) {
      console.log("Error:", error.message);
      pokemonInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }

  // Fetch Pokémon names and populate dropdown options
  fetchPokemonNames();