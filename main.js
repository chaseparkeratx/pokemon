


const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=10";

// const body = document.getElementsByTagName("body")[0];
// const ul = document.createElement("ul");
// body.appendChild(ul);

// fetch(API_URL)
//   .then((response) => {
//     console.log(response);
//     return response.json();
//   })
//   .then((data) => {
//     const pokemon = data.results;
//     console.log(pokemon)

//     pokemon.forEach((pokemon, index) => {

//       const li = createDOMElement("li");
      
//       // create an H2 for the names
//       const h2 = document.createElement("h2");

//       // create an image tag for the picture
//       // const img = document.createElement("img");

//       // add innerText to h2 of person name
//       addDataAndAppendToDOM(
//         `${pokemon.name}`,
//         "innnerText",
//         h2,
//         li
//         );

//       h2.innerText = `${pokemon.name}`;
      
//       ul.appendChild(li);

//       li.classList.add("pokemon");

//       console.log(pokemon);
//     });
//   });
    


// function createDOMElement(tagName) {
//   return document.createElement(tagName);
// }

// function addDataAndAppendToDOM(data, action, childNode, parentNode) {
//   childNode[action] = data;
//   parentNode.appendChild(childNode);
// };

// //drop down filtering
// function myFunction() {
//   dropdown.classList.toggle("show");
// }

// function filterFunction() {
//   var input, filter, ul, li, a, i;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   div = document.getElementById("myDropdown");
//   a = div.getElementsByTagName("a");
//   for (i = 0; i < a.length; i++) {
//     txtValue = a[i].textContent || a[i].innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       a[i].style.display = "";
//     } else {
//       a[i].style.display = "none";
//     }
//   }
// }



    const dropdown = document.getElementById("myDropdown");
    const pokemonList = document.getElementById("pokemonList");
    const displayDiv = document.getElementById("stadium");

    fetch(API_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const pokemon = data.results;

        pokemon.forEach((pokemon) => {
          const li = createDOMElement("li");
          const a = createDOMElement("a");
          a.textContent = pokemon.name;
          a.addEventListener("click", () => {
            // alert(pokemon.name); 
            displayDiv.textContent = pokemon.name; // Show the Pokémon name in the selectedPokemon div
            dropdown.classList.remove("show"); // Hide the dropdown after selecting a Pokémon
          });
          li.appendChild(a);
          pokemonList.appendChild(li);
        });
      });

    function createDOMElement(tagName) {
      return document.createElement(tagName);
    }

    function myFunction() {
      dropdown.classList.toggle("show");
    }

    function filterFunction() {
      var input, filter, ul, li, a, i;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      div = document.getElementById("myDropdown");
      a = div.getElementsByTagName("a");
      for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = "";
        } else {
          a[i].style.display = "none";
        }
      }
    } 