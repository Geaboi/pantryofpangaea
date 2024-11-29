import { getRecipe } from "@/app/actions";
import PostReview from "@/components/review";
import { createClient } from "@/utils/supabase/server";
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
        const { data, error } = await getRecipe(decodeURIComponent(recipeId));
        const supabase = await createClient();

        const {user} = await supabase.auth.getUser();

        if (error || !data ) {
            throw new Error(error || "Recipe not found.");
        }
        
        //Chooses the first item in the returned object
        const recipe = data[0];
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
                <PostReview/>
            </div>
        );
    } catch (err) {
        return <h1>Error: {err.message}</h1>;
    }
}
