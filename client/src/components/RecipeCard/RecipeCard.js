// src/components/RecipeCard.js
import React from 'react';
import './RecipeCard.css';
import silhouette_recipe from './Icon.png';
import { FaEye } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

const RecipeCard = ({ recipe }) => {
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
                <button className="view-recipe">
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