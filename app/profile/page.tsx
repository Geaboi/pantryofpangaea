"use client";
import { useEffect, useState } from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import Image from 'next/image';


export default function Profile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Passionate home cook who loves exploring new recipes from around the world.',
    profileImage: '/path/to/profile-image.jpg',
  });

  const [recipes, setRecipes] = useState([
    { id: 1, title: 'Spaghetti Carbonara', date: '2024-10-05' },
    { id: 2, title: 'Vegan Tacos', date: '2024-11-01' },
    { id: 3, title: 'Chicken Curry', date: '2024-11-10' },
  ]);

  return (
    <section className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Profile</h1>
        
        {/* Profile Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center space-x-4">
            <Image
              src={user.profileImage}
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">{user.bio}</p>
        </div>

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

        {/* Account Settings Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Settings</h2>
          <ul className="space-y-4">
            <li>
              <button className="text-blue-600 hover:underline">Edit Profile</button>
            </li>
            <li>
              <button className="text-blue-600 hover:underline">Change Password</button>
            </li>
            <li>
              <button className="text-blue-600 hover:underline">Privacy Settings</button>
            </li>
            <li>
                <button className="text-red-600 hover:underline">Log Out</button>
            </li>
            <li>
              <button className="text-red-600 hover:underline">Delete Account</button>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </section>
  );
}
