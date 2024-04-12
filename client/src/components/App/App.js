import React, { useState, useEffect } from 'react';
import "./App.css";
import logo from './recipe-finder.png';
import RecipeCard from '../RecipeCard/RecipeCard';

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

            {selectedRecipe && (
                <div className="recipe-detail-overlay" onClick={handleCloseRecipeDetail}>
                    <div className="recipe-detail">
                        {/* Display recipe details */}
                        <h2>{selectedRecipe.name}</h2>
                        <img src={selectedRecipe.image} alt={`Recipe for ${selectedRecipe.name}`} />
                        <p>Description: {selectedRecipe.description}</p>
                        <p>Ingredients: {selectedRecipe.ingredients.join(', ')}</p>
                    </div>
                </div>
            )}

            <main className="show-result">
                <form>
                    <input type="text" name="search" placeholder="Find Recipe"/>
                </form>
            </main>
            <main className="show-result">
                <div className="recipe-cards-container">
                    {recipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} onClick={() => handleRecipeClick(recipe)} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default App;
