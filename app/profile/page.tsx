import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { signOutAction, getUserPosts, deleteUserPost } from "../actions";
import Link from "next/link";

export default async function Profile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data, error } = await getUserPosts(user.id);

  if (error) {
    console.error("Error fetching recipes:", error);
  }

  const profileImage = user.user_metadata?.avatar_url || "/default-profile.jpg";

  {/* User's Recipes Section */}
  return (
    <div className="bg-white p-10 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">My Recipes</h2>
      <ul className="divide-y divide-gray-200">
        {data && data.length > 0 ? (
          data.map((recipe) => (
            
            <li
              key={recipe.id}
              className="flex justify-between items-center py-4"
            >
              <span className="text-gray-800 font-medium text-lg">
                <Link href={`results/${encodeURIComponent(recipe.id)}`}>{recipe.title}</Link>
              </span>
              <span className="text-gray-500 text-sm ml-8">
                {new Date(recipe.created_at).toLocaleDateString()}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-600">No recipes found.</p>
        )}
      </ul>
    </div>
  );  
}