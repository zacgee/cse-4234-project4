import React, { useState } from 'react';
import './RecipeCard.css';
import silhouette_recipe from './Icon.png';
import { FaEye } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

const parseISO8601Duration = (durationString) => {
    const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?$/;
    const match = regex.exec(durationString);
    if (!match) return NaN;
    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    return hours * 60 + minutes;
};

export const formatTime = (durationString) => {
    const timeInMinutes = parseISO8601Duration(durationString);
    if (isNaN(timeInMinutes)) {
        return 'N/A';
    }
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    const formattedHours = String(hours).padStart(2, '0'); // Add leading zero if necessary
    const formattedMinutes = String(minutes).padStart(2, '0'); // Add leading zero if necessary
    return `${formattedHours}:${formattedMinutes}`;
};


const RecipeCard = ({ recipe, onClick }) => {
    const [showRecipeDetail, setShowRecipeDetail] = useState(false); // State to control visibility of recipe detail

    const handleViewRecipe = () => {
        setShowRecipeDetail(true); // Show recipe detail when button is clicked
        onClick(); // Notify App component that this recipe is clicked
    };

    const handleCloseRecipeDetail = () => {
        setShowRecipeDetail(false); // Hide recipe detail when closed
    };

    return (
        <div className="recipe-card">
            <img
                src={recipe.image}
                alt={`Recipe for ${recipe.name}`}
                onError={(event) => {
                    event.target.src = silhouette_recipe;
                    event.onerror = null;
                }}
            />
            <div className="recipe-details">
                <h3>{recipe.name}</h3>
                <p><strong>Cook Time:</strong> {formatTime(recipe.cookTime)}</p>
                <p><strong>Prep Time:</strong> {formatTime(recipe.prepTime)}</p>
                <p><strong>Yield:</strong> {recipe.recipeYield}</p>
                <button className="view-recipe" onClick={handleViewRecipe}>
                    <FaEye /> View Recipe
                </button>
                <button className="add-to-favorites">
                    <MdFavorite /> Add to Favorites
                </button>
            </div>
        </div>
    );
};

export default RecipeCard;
