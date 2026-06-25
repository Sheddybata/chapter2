"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin";
import { createQuizQuestion, deleteQuizQuestion } from "@/lib/supabase/service";
import type { CreateQuizQuestionInput } from "@/types/content";

export async function addQuizQuestion(input: CreateQuizQuestionInput) {
  await requireAdmin();

  const result = await createQuizQuestion(input);

  if (result.error) {
    return { error: result.error };
  }

  revalidatePath("/students");
  revalidatePath("/admin/quiz");

  return { error: null };
}

export async function removeQuizQuestion(questionId: string) {
  await requireAdmin();

  const result = await deleteQuizQuestion(questionId);

  if (result.error) {
    return { error: result.error };
  }

  revalidatePath("/students");
  revalidatePath("/admin/quiz");

  return { error: null };
}
