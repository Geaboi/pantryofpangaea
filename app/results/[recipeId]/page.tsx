import { getRecipe, getReview, getUser } from "@/app/actions";
import PostReview from "@/components/review";
import { createClient } from "@/utils/supabase/server";
import {postReview} from "@/app/actions"
import { Power } from "lucide-react";
import { brotliCompressSync } from "zlib";




export default async function RecipeDetails({ params }: { params: { recipeId: string } }) {
    //Next js somehow thinks this is dynamic
    const { recipeId } = await params;
    //If there is no recipe id found
    if (!recipeId) {
        return <h1>Error: Recipe ID not found</h1>;
    }   
    try {
        // Fetc the recipe data
        const decoded = decodeURIComponent(recipeId);
        const { data: recipeData, error: recipeError } = await getRecipe(decoded);
        const supabase = await createClient();
        //Fetch the reviews
        const { data: reviewData, error: reviewError } = await getReview(decoded);


        if (recipeError || !recipeData) {
            throw new Error(recipeError);
        }
        else if(!reviewData || reviewError ) {
            // throw new Error(reviewError);
        }
        
        //Chooses the first item in the returned object
        const recipe = recipeData[0];

        const { data: userData, error: userError } = await getUser(recipe.author);
        let authorName = "Unknown user";
        if(userData && !userError && userData.length == 1) {
            const user = userData[0];
            authorName = user.display_name;
        }

        // Return the recipe details and mapping it through
        return (
            <div>
                <h1 className="text-3xl font-bold">{recipe.title}</h1>
                <h5 className="text-lg font-normal"><i>Posted by <u>{authorName}</u></i></h5>
                <br />
                <h3 className="text-2xl font-semibold">Ingredients:</h3>
                <ul className="list-disc list-inside">    
                    {recipe.ingredients.map((ingredient : string, index : number) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <br />
                <h3 className="text-2xl font-semibold">Instructions:</h3>
                <ol className="list-decimal list-inside">
                    {recipe.instructions.map((instruction: string, index : number) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
                <br />
                <h3 className="text-2xl font-semibold">Tags:</h3>
                <ul className="list-disc list-inside">    
                    {recipe.tags.map((tag: string, index : number) => (
                        <li key={index}>{tag}</li>
                    ))}
                </ul>
                <br />
                <PostReview formAction={postReview} recipeId={decodeURIComponent(recipeId)} />        
                <br />
                <h3 className="text-2xl font-semibold">Reviews:</h3>
                <h5 className="text-lg font-normal"><i>Average score: <u>{Math.trunc(recipe.average_rating * 10) / 10}/5 across {recipe.num_ratings} reviews</u></i></h5>
                {reviewData && !reviewError && <ul>
                    {reviewData.filter((review: {deleted: boolean}) => !review.deleted).map(async (review: {reviewer_id: string, content: string, rating: number}, index: number) => {
                        const { data: userData, error: userError } = await getUser(review.reviewer_id);
                        let reviewerName = "Unknown user";
                        if(userData && !userError && userData.length > 0) {
                            const user = userData[0];
                            reviewerName = user.display_name;
                        }
                        return <li key={index}>{reviewerName} ({review.rating}/5): {review.content}</li> // Assuming review has a `comment` field
                    })}
                </ul>}
                {(!reviewData || reviewError) && <div>
                    There are no reviews yet. Will you be the first?
                </div>} 
            </div>
        );
    } catch (err : any) {
        return <h1>Error: {err.message}</h1>;
    }
}
