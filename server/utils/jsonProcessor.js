const fs = require('fs');
const Recipe = require('../models/recipeModel');

const processJsonData = async () => {
  try {
    // Read the JSON file
    const data = await fs.promises.readFile('../data/recipes.json', 'utf8');
    const recipes = JSON.parse(data);

    // Loop through the recipes and save them to the database
    for (const recipe of recipes) {
      const newRecipe = new Recipe({
        name: recipe.name,
        description: recipe.description || 'No description available',
        image: recipe.image,
        recipeYield: recipe.recipeYield,
        cookTime: recipe.cookTime,
        prepTime: recipe.prepTime,
        ingredients: recipe.ingredients,
      });
      await newRecipe.save();
    }

    console.log('Recipes saved to database');
  } catch (err) {
    console.error(err);
  }
};

module.exports = { processJsonData };