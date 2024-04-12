import React, { useState } from 'react';
import './RecipeCard.css';
import silhouette_recipe from './Icon.png';
import { FaEye } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

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
                <p><strong>CookTime:</strong> {recipe.cookTime}</p>
                <p><strong>PrepTime:</strong> {recipe.prepTime}</p>
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
