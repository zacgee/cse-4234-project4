
import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import './SearchResults.css';

const SearchResults = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await fetch('/api/recipes');
            const data = await response.json();
            setRecipes(data.recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    return (
        <div className="search-results">
            <h2>Search Results</h2>
            <div className="recipe-list">
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;