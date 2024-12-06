import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/app/actions';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'


export default async function Results(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  // Fetch search params from URL
  const params = props.searchParams;
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 0;
  const tags = query.split(',');

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('recipes')
    .select()
    .eq('deleted', false)
    .contains('tags', tags)
    .order('average_rating', {ascending: false})
    .range(0 + (currentPage * 50), 49 + (currentPage * 50));

  if (error)
    return <main>We couldn't reach the database. Please try again later.</main>;

  return data.length !== 0 ? (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h1 className="text-4xl font-semibold text-center text-orange-600 mb-6 tracking-wide">Results</h1>
        {/* Grid container for recipes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(async (recipe) => {
            const { data: userData, error: userError } = await getUser(recipe.author);
            let authorName = "Unknown user";
            if (userData && !userError && userData.length > 0) {
              const user = userData[0];
              authorName = user.display_name;
            }
            let ratingText = "Unrated";
            if (recipe.num_ratings > 0) {
              ratingText = `Rated ${Math.trunc(recipe.average_rating * 10) / 10}/5 by ${recipe.num_ratings} Chef`;
              if (recipe.num_ratings > 1) ratingText += 's';
            }
            return (
            <Link href={`results/${encodeURIComponent(recipe.id)}`}>
              <div
                key={recipe.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-2">
                  
                    <u>{recipe.title}</u>
                  
                </h3>
                <h5 className="text-lg font-normal text-gray-700">
                  <i>Posted by <u>{authorName}</u></i>
                </h5>
                <p className="text-sm text-gray-500 mt-2">{ratingText}</p>
              </div>
            </Link>
            );
          })}
        </div>
      </main>
    </>
  ) : (
    <main className="text-center text-xl text-gray-600">
      There are no recipes matching those criteria.
    </main>
  );  
}
