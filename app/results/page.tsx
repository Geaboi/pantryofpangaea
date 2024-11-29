import { createClient } from '@/utils/supabase/server';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'


export default async function Results(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  // TODO: Fix this chunk to fetch search params from URL
  // const params = new URLSearchParams(useSearchParams());
  // params.set('query', 'pasta');
  // const searchParams = await props.searchParams;
  // const query = searchParams?.query || '';
  // const currentPage = Number(searchParams?.page) || 0;

  // const tags = query.split(',');

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('recipes')
    .select()
    .eq('deleted', false)
    .contains('tags', []) // TODO: Replace [] with tags
    .range(0, 49);  // TODO: Add (currentPage * 50) to both vals

  if (error)
    return <main>We couldn't reach the database. Please try again later.</main>;

  return data != null ? ( 
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        {data.map((recipe, index) => (
          <div key={recipe.id}>
            {index != 0 && <hr />}
            <Link href={`results/${encodeURIComponent(recipe.id)}`}>
            {recipe.title}
          </Link>
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Instructions:</h3>
            <ol>
              {recipe.instructions.map((instruction) => (
                <li>{instruction}</li>
              ))}
            </ol>
          </div>
        ))}
      </main>
    </>
  ) : (
    <main>There are no recipes matching those criteria.</main>
  );
}
