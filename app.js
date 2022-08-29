const express = require("express");


const PORT = 4000;

const app = express();

app.use(express.json());

// Importing all the pokemon for our data file
const allPokemon = require("./data");






app.listen(4000, () => {
  console.log('server rodando na porta', 4000);
});

app.get("/pokemon", (req, res) => {
  res.status(200).json(allPokemon);
})

app.get('/pokemon/:id', (req, res) => {
  const { id } = req.params;

  const response = allPokemon.filter((pokemon) => pokemon.id === parseInt(id));

  res.status(200).json(allPokemon);
} );

app.get("/search", (req, res) => {
  const {name, type} = req.query;

  if (name && type)
    return res.status(400).json({message: "Search only by name or type"})

  if (name) {
    const result = allPokemon.find((pokemon) => pokemon.name === name);
    return res.status(200).json(result);
  }
  if (type) {
    const result = [];
    for (let i = 0; i < allPokemon.length; i++) {
      for (let j = 0; j < allPokemon[i].types.length; j++) {
        if (type === allPokemon[i].types[j]) result.push(allPokemon[i]);
      }
    }
    return res.status(200).json(result);
  }

})

// -- Define your route listeners here! --

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`))
