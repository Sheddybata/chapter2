import { createClient } from "@/lib/supabase/server";
import type { CampaignEvent, QuizQuestion } from "@/types/content";

function parseQuizQuestion(row: QuizQuestion): QuizQuestion {
  return {
    ...row,
    options: Array.isArray(row.options) ? row.options : [],
  };
}

export async function getCampaignEvents() {
  const supabase = await createClient();

  if (!supabase) {
    return [] as CampaignEvent[];
  }

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getCampaignEvents", error.message);
    return [] as CampaignEvent[];
  }

  return (data ?? []) as CampaignEvent[];
}

export async function getQuizQuestions() {
  const supabase = await createClient();

  if (!supabase) {
    return [] as QuizQuestion[];
  }

  const { data, error } = await supabase
    .from("quiz_questions")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getQuizQuestions", error.message);
    return [] as QuizQuestion[];
  }

  return (data ?? []).map((row) => parseQuizQuestion(row as QuizQuestion));
}
