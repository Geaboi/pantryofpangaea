"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PostRecipeForm from "@/components/post-recipe-form";
import { postRecipeNew } from "../actions";

export default async function Post() {
    return (
        <>
            <main>
                <h1 className="text-5xl font-bold text-center">Post Recipe</h1>
                <hr className="my-16" />
                <PostRecipeForm postRecipe={postRecipeNew} />
            </main>
        </>
    );
}