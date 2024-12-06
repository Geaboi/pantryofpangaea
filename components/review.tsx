"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";



export default function PostReview({ formAction , recipeId}) {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (review.trim()) {
            await formAction({ review, rating ,recipeId });
        }
    };
  
  return (
    <div>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <label
                    htmlFor="rating"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
                >
                    Rating (1 to 5)
                </label>
                <input
                    type="number"
                    id="rating"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
            <textarea id="message" onChange={(e) => {setReview(e.target.value)}} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
            <button type="submit" className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6"> 
                Submit
            </button>
        </form>
    </div>
  );
}
