import Link from "next/link";
import TopRecipes from "@/components/top-recipes";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-400 to-pink-500 text-white py-20 text-center">
        <h1 className="text-5xl lg:text-7xl font-extrabold mb-6">
          Welcome to the Pantry of Pangaea
        </h1>
        <p className="text-xl lg:text-2xl mb-6 max-w-2xl mx-auto">
          Explore recipes from around the world, share your culinary creations, and connect with a global community of food lovers.
        </p>
        <Link
          href="/results"
          className="bg-white text-pink-500 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 shadow-lg"
        >
          Discover Recipes
        </Link>
      </section>

      {/* Popular Recipes Section */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-orange-600 mb-6">Top Recipes</h2>
        <TopRecipes />
      </section>
    </>
  );
}
