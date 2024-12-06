"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter, usePathname } from "next/navigation";


export default function PostReview({ formAction , recipeId}) {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState("");

    const router = useRouter();
    const pathname = usePathname();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (review.trim()) {
            const result = await formAction({ review: review.trim(), rating ,recipeId });
            if(result) {
                router.push(pathname);
            }
        }
    };
  
  return (
    <div>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-semibold">Leave a Review:</h3>
            <label
                htmlFor="rating"
                className="text-lg font-normal"
            >
                Rating:
            </label>
            <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option value="" disabled>
                    Select a rating
                </option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <label htmlFor="message" className="text-lg font-normal">Your Message:</label>
            <textarea id="message" onChange={(e) => {setReview(e.target.value)}} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
            <button type="submit" className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6"> 
                Submit
            </button>
        </form>
    </div>
  );
}
