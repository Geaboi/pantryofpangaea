import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { createClient } from "@/utils/supabase/server";

export default async function Results() {
    const supabase = await createClient();

    const { data, error } = await supabase.from("recipes").select();

    return (
        <>
            <main className="flex-1 flex flex-col gap-6 px-4">
                {data.map((recipe, index) => (
                    <div>
                        {index != 0 && <hr/>}
                        <h1>{recipe.title}</h1>
                        <h3>Ingredients:</h3>
                        <ul>
                            {recipe.ingredients.map(ingredient => (
                                <li>{ingredient}</li>
                            ))}
                        </ul>
                        <h3>Instructions:</h3>
                        <ol>
                            {recipe.instructions.map(instruction => (
                                <li>{instruction}</li>
                            ))}
                        </ol>
                    </div>
                ))}
            </main>
        </>
    );
}