"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SupabaseClient } from "@supabase/supabase-js";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect("/sign-in");
    }

    //Post data into the database
    const {data: userData, error: userError} = await supabase
      .from('userdata')
      .insert({
        id: user.id,
        display_name: email.substring(0, email.indexOf('@')),
        is_admin: false
      });


    if (userError) {
      console.error("Error registering username: ", error);
    } else {
      console.log("Username registered successfully: ", userData);
    }
    return redirect("/");
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  console.log("Signing out");
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

//Api Post request for users to post into the database
export const postRecipe = async (formData: FormData) => {
  //Access User Id
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
 
  //Get the form data 
  const recipe = formData['recipe'];
  const ingredients = formData['ingredients'];
  const category = formData['category'];
  const description = formData['description'];

  //Post data into the database
  const {data, error} = await supabase
    .from('recipes')
    .insert({
      title: recipe,
      author: user['id'],
      ingredients: [ingredients],
      instructions: [description],
      tags: [category],
      deleted: false
    });

  if (error) {
    console.error("Error posting recipe:", error);
  } else {
    console.log("Recipe posted successfully:", data); 
  }
};

export const postRecipeNew = async (title: string, ingredients: string[], instructions: string[], tags: string[]): Promise<boolean> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  //Post data into the database
  const {data, error} = await supabase
    .from('recipes')
    .insert({
      title: title,
      author: user['id'],
      ingredients: ingredients,
      instructions: instructions,
      tags: tags,
      deleted: false
    });


  if (error) {
    console.error("Error posting recipe: ", error);
    return new Promise((resolve, reject) => resolve(false));
  } else {
    console.log("Recipe posted successfully: ", data);
    tags.forEach(async (tag: string) => {
      // Keep track of tag counts
      const {data: tagData, error: tagError} = await supabase
        .from('tags')
        .select()
        .eq('tag', tag);
      
      if(!tagError && tagData) {
        if(tagData.length == 0) {
          // Create the tag
          const _ = await supabase
            .from('tags')
            .insert({
              tag: tag,
              use_count: 1
            });
        } else {
          // Update the tag
          const tagId = tagData[0].id;
          const newTagCount = tagData[0].use_count + 1;
          const _ = await supabase
            .from('tags')
            .update({
              tag: tag,
              use_count: newTagCount
            })
            .eq('id', tagId);
        }
      }
    });
    return new Promise((resolve, reject) => resolve(true));
  }
};



//Dunno if this is needed yet, but should retrieve the recipe data
export const getRecipe = async(id : string) => {
  const supabase = await createClient();
  const {data, error} = await supabase
    .from('recipes')
    .select()
    .eq('id',id)
    .eq('deleted', false);

  if (error) {
    console.error("Database error:", error);
    return { data: null, error: "Database query failed" };
  }

  return { data, error: null };
};


//API Post request for reviews
export const postReview = async ({ review, rating, recipeId }: { review: string, rating: number, recipeId: string }) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  
  const {data: _, error} = await supabase
    .from('reviews')
    .insert({
      recipe_id: recipeId,
      reviewer_id: user['id'],
      content: review,
      rating: rating
    });

  if(error) {
    console.log(error);
    return new Promise((resolve, reject) => resolve(false));
  } else {
    const {data: recipeData, error: recipeError} = await supabase
      .from('recipes')
      .select()
      .eq('id', recipeId);

    if(!recipeError && recipeData) {
      const num_ratings = recipeData[0].num_ratings + 1;
      const new_avg_rating = (Math.round(recipeData[0].average_rating * recipeData[0].num_ratings) + rating) / (recipeData[0].num_ratings + 1);
      const _ = await supabase
        .from('recipes')
        .update({
          average_rating: new_avg_rating,
          num_ratings
        })
        .eq('id', recipeId);
    }
    return new Promise((resolve, reject) => resolve(true));
  }
};

export const getReview = async(recipeId : string) => {
  const supabase = await createClient();
  const {data, error} = await supabase
    .from('reviews')
    .select()
    .eq('recipe_id	',recipeId)
    .eq('deleted', false);

  if (error) {
    console.error("Database error:", error);
    return { data: null, error: "Database query failed" };
  }

  return { data, error: null };
};

export const getUser = async(userId : string) => {
  const supabase = await createClient();
  const {data, error} = await supabase
    .from('userdata')
    .select()
    .eq('id', userId);

  if (error) {
    console.error("Database error:", error);
    return { data: null, error: "Database query failed" };
  }

  return { data, error: null };
};

export const getUserPosts = async(userId : string) => {
  const supabase = await createClient();
  const {data, error} = await supabase
    .from('recipes')
    .select("*")
    .eq('deleted', false)
    .eq('author', userId);

    if (error) {
      console.error("Database error:", error);
      return { data: null, error: "Database query failed" };
    }
    console.log(data);
    return { data, error: null };
};

export const deleteUserPost = async(recipeId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('recipes')
    .update({ deleted: true }) // Update the 'deleted' column
    .eq('id', recipeId); // Filter by recipe ID

  if (error) {
    console.error("Database error:", error);
    return { data: null, error: "Failed to soft delete the recipe." };
  }

  console.log("Soft-deleted recipe:", data);
  return { data, error: null };
}