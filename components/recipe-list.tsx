"use client";
import { useState } from "react";
import { deleteUserPost } from "@/app/actions";
import Link from "next/link";

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
    <ul className="divide-y divide-gray-200">
      {localRecipes && localRecipes.length > 0 ? (
        localRecipes
          .filter((recipe) => !recipe.deleted) // Filter out deleted recipes
          .map((recipe) => (
            <li
              key={recipe.id}
              className="flex justify-between items-center py-4"
            >
              <span className="text-gray-800 font-medium text-lg">
                <Link href={`results/${encodeURIComponent(recipe.id)}`}>{recipe.title}</Link>
              </span>
              <span className="text-gray-500 text-sm mx-8">
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
  );
}
