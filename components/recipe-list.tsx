"use client";
import { useState } from "react";
import { deleteUserPost } from "@/app/actions";

export default function RecipeList({ recipes }) {
  const [localRecipes, setLocalRecipes] = useState(recipes); //Updates the local recipes

  //Handle function for deleting recipes
  const handleDelete = async (recipeId) => {
    try {
      const res = await deleteUserPost(recipeId);

      if (res?.error) {
        console.error("Error deleting recipe:", res.error);
        alert("Failed to delete recipe.");
      } else {
        setLocalRecipes((prev) =>
          prev.map((recipe) =>
            recipe.id === recipeId ? { ...recipe, deleted: true } : recipe
          )
        );
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    }
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        My Recipes
      </h2>
      <ul className="space-y-4">
        {localRecipes && localRecipes.length > 0 ? (
          localRecipes
            .filter((recipe) => !recipe.deleted) // Filter out deleted recipes
            .map((recipe) => (
              <li
                key={recipe.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="text-gray-700">{recipe.title}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(recipe.created_at).toLocaleDateString()}
                </span>
                <button
                  className="text-red-500 text-sm hover:underline"
                  onClick={() => handleDelete(recipe.id)}
                >
                  Delete
                </button>
              </li>
            ))
        ) : (
          <p className="text-gray-600">No recipes found.</p>
        )}
      </ul>
    </div>
  );
}
