import Link from "next/link";

export default function Home() {
  // Sample data for recipes
  const recipes = [
    {
      id: 1,
      name: "Vegan Pancakes",
      description: "Delicious and fluffy pancakes made with plant-based ingredients.",
      author: "Jane Doe",
      likes: 120,
    },
    {
      id: 2,
      name: "Spaghetti Bolognese",
      description: "A classic Italian dish with rich tomato sauce and herbs.",
      author: "John Smith",
      likes: 95,
    },
    {
      id: 3,
      name: "Chocolate Cake",
      description: "Rich, moist, and utterly decadent chocolate cake.",
      author: "Mary Johnson",
      likes: 150,
    },
    {
      id: 4,
      name: "Sushi Rolls",
      description: "Fresh and flavorful sushi rolls with a variety of fillings.",
      author: "James Brown",
      likes: 180,
    },
  ];

  // Get the top 4 recipes by likes
  const topRecipes = recipes
    .sort((a, b) => b.likes - a.likes) // Sort recipes by likes in descending order
    .slice(0, 4); // Select the top 4

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
          href="/search"
          className="bg-white text-pink-500 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 shadow-lg"
        >
          Discover Recipes
        </Link>
      </section>

      {/* Popular Recipes Section */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-orange-600 mb-6">Top Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="border-2 border-yellow-500 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white"
            >
              <h3 className="text-xl font-bold text-gray-800">{recipe.name}</h3>
              <p className="text-gray-600 mb-2">{recipe.description}</p>
              <p className="text-sm text-gray-500">By {recipe.author}</p>
              <p className="text-sm text-gray-500 mt-2">
                <span className="font-bold">{recipe.likes}</span> Likes
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
