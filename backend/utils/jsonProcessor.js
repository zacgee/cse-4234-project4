const fs = require('fs');
const Recipe = require('../models/recipeModel');

const processJsonData = (req, res) => {
  fs.readFile('./data/recipes.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading JSON file');
    }

    const recipe = JSON.parse(data);
    const newRecipe = new Recipe(recipe);
    newRecipe.save((err) => {
      if (err) {
        return res.status(500).send('Error saving recipe to database');
      }
      res.send('Recipe saved to database');
    });
  });
};

module.exports = { processJsonData };