import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { signOutAction, getUserPosts, deleteUserPost } from "../actions";
import RecipeList from "@/components/recipe-list";

export default async function Profile() {
  //Create Client and fetch user data
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: recipes, error } = await getUserPosts(user.id);

  if (error) {
    console.error("Error fetching recipes:", error);
  }

  const profileImage = user.user_metadata?.avatar_url || "/default-profile.jpg";
  //Returns all the recipes
  return (
    <section className="bg-white p-10 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">My Recipes</h2>
      <RecipeList recipes={recipes} />
    </section>
  );
}