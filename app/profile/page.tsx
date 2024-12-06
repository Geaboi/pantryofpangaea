"use client";
import { useEffect, useState } from 'react';


export default function Profile() {
  const [recipes, setRecipes] = useState([
    { id: 1, title: 'Spaghetti Carbonara', date: '2024-10-05' },
    { id: 2, title: 'Vegan Tacos', date: '2024-11-01' },
    { id: 3, title: 'Chicken Curry', date: '2024-11-10' },
  ]);

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">My Recipes</h1>

        {/* User's Recipes Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Recipes</h2>
          <ul className="space-y-4">
            {recipes.map((recipe) => (
              <li key={recipe.id} className="flex justify-between items-center">
                <span className="text-gray-700">{recipe.title}</span>
                <span className="text-gray-500 text-sm">{recipe.date}</span>
              </li>
            ))}
          </ul>
        </div>
    </section>
  );
}
