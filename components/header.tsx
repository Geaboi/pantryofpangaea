import { signOutAction } from "@/app/actions";
import { signInAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function Header() {
    //Check if User is signed in or out
    const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

    if(user) {
        return (
            <div className="h-16 w-screen px-2 bg-slate-400 dark:bg-slate-900 flex flex-row justify-start items-center space-x-2">
                <p className="h-12 px-2 rounded-lg bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-slate-300 text-center align-middle">Pantry of Pangaea</p>
                <form action={signOutAction}>
            <Button type="submit" variant={"outline"}>
              Sign out
            </Button>
          </form>
            </div>
        );
    }
    else {
        return (
            <div className="h-16 w-screen px-2 bg-slate-400 dark:bg-slate-900 flex flex-row justify-start items-center space-x-2">
                <p className="h-12 px-2 rounded-lg bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-slate-300 text-center align-middle">Pantry of Pangaea</p>
                <form action={signInAction}>
                    <Button type="submit" variant={"outline"}>
                    Sign In
                    </Button>
                </form>
            </div>
        );
    }
}