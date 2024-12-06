import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import PostRecipe from "@/components/post";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { postRecipe } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";



export default async function ProtectedPage() {
  // Send ALL users to home
  return redirect("/");
}