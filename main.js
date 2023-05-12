


const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

const body = document.getElementsByTagName("body")[0];
const ul = document.createElement("ul");
body.appendChild(ul);

fetch(API_URL)
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    const pokemon = data.results;
    console.log(pokemon)

    pokemon.forEach((pokemon, index) => {

      const li = createDOMElement("li");
      
      // create an H2 for the names
      const h2 = document.createElement("h2");

      // create an image tag for the picture
      // const img = document.createElement("img");

      // add innerText to h2 of person name
      addDataAndAppendToDOM(
        `${pokemon.name}`,
        "innnerText",
        h2,
        li
        );

      h2.innerText = `${pokemon.name}`;
      
      ul.appendChild(li);

      li.classList.add("pokemon");

      console.log(pokemon);
    });
  });
    

      // add src alt to image tag for persons pic

      // img.src = person.picture.medium;
      // addDataAndAppendToDOM(pokemon.picture.medium, "src", img, li);

      // //img alt
      // addDataAndAppendToDOM(
      //   `${pokemon.name.first}`,
      //   "alt",
      //   img,
      //   li
      // );

      // img.alt = `${person.name.first} ${person.name.last}`;
      // add H2 to li
      // li.appendChild(h2);
      // append image to li
      // li.appendChild(img);
      // append li to ul
      
    // });

function createDOMElement(tagName) {
  return document.createElement(tagName);
}

function addDataAndAppendToDOM(data, action, childNode, parentNode) {
  childNode[action] = data;
  parentNode.appendChild(childNode);
};