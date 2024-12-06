import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/app/actions';
import Link from 'next/link';

export default async function TopRecipes() {
    const supabase = await createClient();

    const { data: topRecipes, error } = await supabase
      .from('recipes')
      .select()
      .eq('deleted', false)
      .order('average_rating', {ascending: false})
      .range(0, 3);

    if (error)
      return <div>We couldn't reach the database. Please try again later.</div>;
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topRecipes.map(async (recipe) => {
                const { data: userData, error: userError } = await getUser(recipe.author);
                let authorName = "Unknown user";
                if(userData && !userError && userData.length > 0) {
                  const user = userData[0];
                  authorName = user.display_name;
                }
                return (
                    <div
                        key={recipe.id}
                        className="border-2 border-yellow-500 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white"
                    >
                        <Link href={`results/${encodeURIComponent(recipe.id)}`}>
                            <h3 className="text-xl font-bold text-gray-800">{recipe.title}</h3>
                        </Link>
                        {/* The description field doesn't exist. It probably should, though. */}
                        {/* <p className="text-gray-600 mb-2">{recipe.description}</p> */}
                        <p className="text-sm text-gray-500">By {authorName}</p>
                        <p className="text-sm text-gray-500 mt-2">
                        <span className="font-bold">{Math.trunc(recipe.average_rating * 10) / 10}</span>/5
                        </p>
                    </div>
                );
            })}
        </div>
    );
}