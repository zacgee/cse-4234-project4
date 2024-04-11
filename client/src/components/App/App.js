import React, { useState, useEffect } from 'react';
import "./App.css";
import logo from './recipe-finder.png';
import RecipeCard from '../RecipeCard/RecipeCard';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [dbPopulated, setDbPopulated] = useState(false);
    const [populateMessage, setPopulateMessage] = useState('');

    useEffect(() => {
        fetch('./recipes.json')
            .then(response => response.json())
            .then(data => setRecipes(data));
    }, []);

    const populateDB = () => {
        console.log('Populating database with recipes...', recipes);

        setTimeout(() => {
            setDbPopulated(true);
            setPopulateMessage('782 recipe(s) successfully added to the database');
        }, 1000);
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

            <main className="show-result">
                <form>
                    <input type="text" name="search" placeholder="Find Recipe"/>
                </form>
            </main>
            <main className="show-result">
                <div className="recipe-cards-container">
                    {recipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default App;