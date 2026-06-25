"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

function getNetworkErrorMessage(error: unknown) {
  if (
    error instanceof TypeError ||
    (error instanceof Error &&
      /fetch failed|ECONNRESET|network/i.test(error.message))
  ) {
    return "Could not reach Supabase. Check your internet connection and confirm your Supabase project is active.";
  }

  return "Something went wrong. Please try again.";
}

export async function loginAction(email: string, password: string) {
  const supabase = await createClient();

  if (!supabase) {
    return { error: "Supabase is not configured yet. Add your project keys to the environment." };
  }

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      return { error: error.message };
    }
  } catch (error) {
    return { error: getNetworkErrorMessage(error) };
  }

  revalidatePath("/", "layout");
  return { success: true as const };
}

export async function signupAction(
  fullName: string,
  email: string,
  password: string,
) {
  const supabase = await createClient();

  if (!supabase) {
    return { error: "Supabase is not configured yet. Add your project keys to the environment." };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (data.session) {
      revalidatePath("/", "layout");
      return { success: true as const, redirectTo: "/account" as const };
    }
  } catch (error) {
    return { error: getNetworkErrorMessage(error) };
  }

  return { success: true as const, redirectTo: "/login?registered=1" as const };
}
