const express = require('express');
const Recipe = require('../models/recipeModel');

const router = express.Router();

// Get a specific recipe
router.get('/:id', getRecipe, (req, res) => {
  res.json(res.recipe);
});

// Search for recipes
router.get('/search', async (req, res) => {
  const { q } = req.query;
  const recipes = await Recipe.find({ name: { $regex: q, $options: 'i' } });
  res.json(recipes);
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