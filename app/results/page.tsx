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

  return (data != null) ? (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h1 className="text-3xl font-bold">Results:</h1>
        {data.map(async (recipe) => {
          const { data: userData, error: userError } = await getUser(recipe.author);
          let authorName = "Unknown user";
          if(userData && !userError && userData.length > 0) {
            const user = userData[0];
            authorName = user.display_name;
          }
          let ratingText = "Unrated";
          if(recipe.num_ratings > 0) {
            ratingText = `Rated ${Math.trunc(recipe.average_rating * 10) / 10}/5 by ${recipe.num_ratings} Chef`;
            if(recipe.num_ratings > 1) ratingText += 's';
          }
          return (
            <div key={recipe.id}>
              <h3 className="text-2xl font-bold">
                <Link href={`results/${encodeURIComponent(recipe.id)}`}>
                  <u>{recipe.title}</u>
                </Link>
              </h3>
              <h5 className="text-lg font-normal">
                <i>Posted by <u>{authorName}</u>
                <br />{ratingText}</i>
              </h5>
            </div>
          );
      })}
      </main>
    </>
  ) : (
    <main>There are no recipes matching those criteria.</main>
  );
}
