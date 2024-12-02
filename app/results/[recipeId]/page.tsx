import { getRecipe, getReview } from "@/app/actions";
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
            throw new Error(reviewError);
        }
        
        //Chooses the first item in the returned object
        const recipe = recipeData[0];


        // Return the recipe details and mapping it through
        return (
            <div>
                <h1>{recipe.title}</h1>
                <h3>Ingredients:</h3>
                <ul>    
                    {recipe.ingredients.map((ingredient : string, index : number) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <h4>Instructions:</h4>
                <ol key="Instructions">
                    {recipe.instructions.map((instruction: string, index : number) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
                <PostReview formAction={postReview} recipeId={decodeURIComponent(recipeId)} />        
                <h3>Reviews:</h3>
                <ul>
                    {reviewData?.map((review: any, index: number) => (
                        <li key={index}>{review.content} {review.rating}</li> // Assuming review has a `comment` field
                    ))}
                </ul>   
                 </div>
        );
    } catch (err : any) {
        return <h1>Error: {err.message}</h1>;
    }
}
