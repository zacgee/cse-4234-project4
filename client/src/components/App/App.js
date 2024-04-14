import React, { useState, useEffect } from 'react';
import "./App.css";
import logo from './recipe-finder.png';
import RecipeCard from '../RecipeCard/RecipeCard';
import { formatTime } from '../RecipeCard/RecipeCard'; 
import { MdFavorite } from "react-icons/md";

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [dbPopulated, setDbPopulated] = useState(false);
    const [populateMessage, setPopulateMessage] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        fetch('./recipes.json')
            .then(response => response.json())
            .then(data => setRecipes(data));
    }, []);

    const populateDB = () => {
        fetch('/api/populateDB', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            setDbPopulated(true);
            setPopulateMessage(data.message);
        })
        .catch(error => console.error('Error populating database:', error));
    };

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleCloseRecipeDetail = () => {
        setSelectedRecipe(null);
    };

    return (
        <div className="app">
            <header className="app-header">
                <div className="top">
                    {!dbPopulated && (
                        <button className="navbutton" onClick={populateDB}>Populate DB</button>
                    )}

                    {dbPopulated && (
                        <div className="populate-message">{populateMessage}</div>
                    )}
                </div>
                <div>
                    <img src={logo} alt="logo"/>
                </div>
            </header>

            {selectedRecipe ? (
                <div className="recipe-detail-overlay" onClick={handleCloseRecipeDetail}>
                    <div className="recipe-detail">
                        {/* Display recipe details */}
                        <img src={selectedRecipe.image} alt={`Recipe for ${selectedRecipe.name}`} />
                        <h3>{selectedRecipe.name}</h3>
                        <p><strong>Cook Time:</strong> {formatTime(selectedRecipe.cookTime)}</p>
                        <p><strong>Prep Time:</strong> {formatTime(selectedRecipe.prepTime)}</p>
                        <p><strong>Yield:</strong> {selectedRecipe.recipeYield}</p>
                        <p>{selectedRecipe.description}</p>
                        <h3>Ingredients</h3>
                        <hr></hr>
                        <ul className="ingredients-list">
                        {selectedRecipe.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient}
                                <button className="add-button">+</button>
                            </li>
                        ))}
                        </ul>
                        <button className="add-to-favorites">
                            <MdFavorite /> Add to Favorites
                        </button>
                    </div>
                </div>
            ) : (
                <main className="show-result">
                    <div className="recipe-cards-container">
                        {recipes.map((recipe, index) => (
                            <RecipeCard key={index} recipe={recipe} onClick={() => handleRecipeClick(recipe)} />
                        ))}
                    </div>
                </main>
            )}
        </div>
    );
};

export default App;
