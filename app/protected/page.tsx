import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import PostRecipe from "@/components/post";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { postRecipe } from "@/app/actions";
import Recipe from "@/components/Recipe"


export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
<PostRecipe/> 
 );
}