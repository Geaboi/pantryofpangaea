import { createClient } from '@/utils/supabase/server';
import { useSearchParams } from 'next/navigation';

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
    .range(0 + (currentPage * 50), 49 + (currentPage * 50));

  if (error)
    return <main>We couldn't reach the database. Please try again later.</main>;

  return data != null ? (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        {data.map((recipe, index) => (
          <div>
            {index != 0 && <hr />}
            <h1>{recipe.title}</h1>
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient: string, index: number) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Instructions:</h3>
            <ol>
              {recipe.instructions.map((instruction: string, index: number) => (
                <li key={index}>{instruction}</li>
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
