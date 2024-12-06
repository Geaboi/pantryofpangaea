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
    <section className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">My Recipes</h1>

        {/* User's Recipes Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Recipes</h2>
          <ul className="space-y-4">
          <RecipeList recipes={recipes} />
          </ul>
        </div>
      </div>
    </section>
  );
}