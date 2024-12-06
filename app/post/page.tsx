"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PostRecipeForm from "@/components/post-recipe-form";
import { postRecipeNew } from "../actions";

export default async function Post() {
    return (
        <>
            <main>
            <h1 className="text-4xl font-semibold text-center text-orange-600 mb-6 tracking-wide">Post Recipe</h1>
            <PostRecipeForm postRecipe={postRecipeNew} />
            </main>
        </>
    );
}