import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { signOutAction, getUserPosts, deleteUserPost } from "../actions";

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
    console.error("Error fetching recipes:", error.message);
  }

  const profileImage = user.user_metadata?.avatar_url || "/default-profile.jpg";

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Profile</h1>

        {/* Profile Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center space-x-4">
            <Image
              src={profileImage}
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user.id}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">Template Bio</p>
        </div>

        {/* User's Recipes Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Recipes</h2>
          <ul className="space-y-4">
            {data && data.length > 0 ? (
              data.map((recipe) => (
                <li key={recipe.id} className="flex justify-between items-center">
                  <span className="text-gray-700">{recipe.title}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(recipe.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No recipes found.</p>
            )}
          </ul>
        </div>

        {/* Account Settings Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Settings</h2>
          <ul className="space-y-4">
            <li>
              <button className="text-blue-600 hover:underline">Edit Profile</button>
            </li>
            <li>
              <button className="text-blue-600 hover:underline">Change Password</button>
            </li>
            <li>
              <button className="text-blue-600 hover:underline">Privacy Settings</button>
            </li>
            <li>
              <button className="text-red-600 hover:underline" onClick={signOutAction}>
                Log Out
              </button>
            </li>
            <li>
              <button className="text-red-600 hover:underline">Delete Account</button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}