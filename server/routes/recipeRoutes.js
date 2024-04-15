const express = require('express');
const Recipe = require('../models/recipeModel');

const router = express.Router();

const fs = require('fs');
const path = require('path');

// Search for recipes
router.get('/search', async (req, res) => {
  const { query } = req.query;
  if (typeof query !== 'string') {
    return res.status(400).json({ message: 'Invalid search query' });
  }
  
  try {
    const recipes = await Recipe.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { ingredients: { $regex: query, $options: 'i' } },
      ]
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get a specific recipe
router.get('/:id', getRecipe, (req, res) => {
  res.json(res.recipe);
});

// Create a new recipe
router.post('/', async (req, res) => {
  const { name, description, image, recipeYield, cookTime, prepTime, ingredients } = req.body;

  const recipe = new Recipe({
    name,
    description,
    image,
    recipeYield,
    cookTime,
    prepTime,
    ingredients,
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Populate the database with recipes from recipes.json
router.post('/populateDB', async (req, res) => {
  try {
    // Read recipes from recipes.json file
    const recipesFilePath = path.join(__dirname, '..', '..', 'data', 'recipes.json');
    const recipesData = JSON.parse(fs.readFileSync(recipesFilePath, 'utf-8'));
    
    // Insert recipes into the database
    await Recipe.insertMany(recipesData);
    
    res.json({ message: '782 recipe(s) successfully added to the database' });
  } catch (error) {
    console.error('Error populating database:', error);
    res.status(500).json({ message: 'Error populating database' });
  }
});

// Middleware function to get a recipe by ID
async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: 'Cannot find recipe' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.recipe = recipe;
  next();
}

module.exports = router;