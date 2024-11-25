import { ReactNode } from 'react';
import { Footer } from "../components/footer";
import {Header} from "../components/header";

export default function FAQ() {
  return (
    <section>
      <Header></Header>
    <div className="bg-white text-gray-800 min-h-screen p-8 sm:p-12 lg:p-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">Frequently Asked Questions</h1>
        <p className="text-center text-gray-600 mb-8">
          Here are some of the most commonly asked questions about Pantry of Pangaea. If you have more questions, feel free to reach out!
        </p>

        {/* FAQ Items */}
        <FAQItem title="What is Pantry of Pangaea?">
          Pantry of Pangaea is a social media platform that allows users to share, discover, and save recipes from around the world. It’s a place where food lovers can connect and find inspiration for their next meal.
        </FAQItem>

        <FAQItem title="How do I share a recipe?">
          You can share a recipe by creating an account and clicking on the "Share Recipe" button. Fill in the recipe details, upload images, and tag it by ingredients, meal type, and cuisine for easy discovery by others.
        </FAQItem>

        <FAQItem title="What kind of tags can I use for my recipes?">
          You can tag recipes by key attributes such as ingredients, meal type (e.g., breakfast, dinner), cuisine (e.g., Italian, Mexican), dietary preferences (e.g., vegan, gluten-free), and cooking time.
        </FAQItem>

        <FAQItem title="Is Pantry of Pangaea free to use?">
          Yes, Pantry of Pangaea is completely free to use. You can browse recipes, save your favorites, and share your own recipes without any charges.
        </FAQItem>

        <FAQItem title="How can I contact support?">
          If you have any issues or questions, please reach out to us via our <a href="/contact" className="text-blue-600 hover:underline">Contact Us</a> page.
        </FAQItem>
      </div>
    </div>
    <Footer></Footer>
    </section>
  );
}

// Reusable FAQItem Component
interface FAQItemProps {
  title: string;
  children: ReactNode;
}

function FAQItem({ title, children }: FAQItemProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">{title}</h2>
      <p className="text-gray-800 leading-relaxed">{children}</p>
    </section>
  );
}
