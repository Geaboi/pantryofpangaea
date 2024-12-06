export default function about() {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">About Pantry of Pangaea</h1>
  
        {/* Introduction */}
        <section className="mb-8">
          <p className="text-lg text-gray-800 leading-relaxed">
            Welcome to <span className="font-semibold text-blue-700">Pantry of Pangaea</span>, the social media platform for food enthusiasts around the world! Our mission is to connect people through the love of cooking and to build a diverse and inclusive community of home cooks, professional chefs, and everyone in between.
          </p>
        </section>
  
        {/* Our Vision */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">Our Vision</h2>
          <p className="text-gray-800 leading-relaxed">
            At Pantry of Pangaea, we believe that food brings people together and that sharing recipes is a way of sharing culture, tradition, and creativity. We want to make it easy for you to discover new recipes, explore unique ingredients, and find inspiration from global cuisines.
          </p>
        </section>
  
        {/* Key Features */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">Key Features</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li>
              <span className="font-semibold">Recipe Sharing:</span> Share your favorite recipes with a community of like-minded food lovers.
            </li>
            <li>
              <span className="font-semibold">Community Feedback:</span> Receive feedback, comments, and ratings from other users, and engage in meaningful discussions.
            </li>
            <li>
              <span className="font-semibold">Personalized Collections:</span> Save and organize your favorite recipes in personalized collections for easy access.
            </li>
            <li>
              <span className="font-semibold">Tagging System:</span> Easily tag recipes by ingredients, meal type (e.g., breakfast, dinner), cuisine (e.g., Italian, Mexican), dietary preferences, and cooking time. This makes it simple to filter and find recipes that suit your needs.
            </li>
          </ul>
        </section>
  
        {/* Tagging System */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">Discover Recipes with Advanced Tagging</h2>
          <p className="text-gray-800 leading-relaxed">
            Pantry of Pangaea makes it easy to discover recipes that match your preferences. Our advanced tagging system allows users to search and filter recipes based on key attributes:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-800">
            <li><span className="font-semibold">Ingredients:</span> Filter recipes by ingredients you have or want to use.</li>
            <li><span className="font-semibold">Meal Type:</span> Whether you're looking for breakfast, lunch, dinner, or dessert recipes, our tags make it easy to find the right fit.</li>
            <li><span className="font-semibold">Cuisine:</span> Explore flavors from around the world with tags for various cuisines, including Italian, Japanese, Mexican, and more.</li>
            <li><span className="font-semibold">Dietary Preferences:</span> Find recipes that cater to specific dietary needs, like vegan, gluten-free, or low-carb.</li>
            <li><span className="font-semibold">Cooking Time:</span> Need something quick? Filter recipes by cooking time to fit your schedule.</li>
          </ul>
        </section>
  
        {/* Why Join Pantry of Pangaea */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">Why Join Pantry of Pangaea?</h2>
          <p className="text-gray-800 leading-relaxed">
            Pantry of Pangaea is more than just a recipe platform—it's a community where people can connect, inspire, and learn from each other. By joining, you'll have access to a world of recipes, the opportunity to share your own culinary creations, and the chance to be part of a global community united by food.
          </p>
        </section>
  
        {/* Call to Action */}
        <section className="text-center mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Start Your Culinary Journey Today!</h2>
          <p className="text-gray-800 leading-relaxed mb-6">
            Whether you're a seasoned chef or a home cook trying out new recipes, Pantry of Pangaea is here to help you explore, create, and share. Join us and start discovering recipes from every corner of the world!
          </p>
          <a
            href="/signup"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md text-lg font-medium"
          >
            Join Now
          </a>
        </section>
      </div>
    );
  }
  