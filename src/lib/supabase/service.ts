import { createClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Profile } from "@/types/articles";
import type {
  CampaignEvent,
  CreateEventInput,
  CreateQuizQuestionInput,
  QuizQuestion,
} from "@/types/content";

export function createServiceClient() {
  const env = getSupabaseEnv();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!env || !serviceRoleKey) {
    return null;
  }

  return createClient(env.url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function listContributorProfiles() {
  const supabase = createServiceClient();

  if (!supabase) {
    return [] as Profile[];
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("listContributorProfiles", error.message);
    return [] as Profile[];
  }

  return (data ?? []) as Profile[];
}

export async function setContributorPublishing(
  profileId: string,
  canPublish: boolean,
) {
  const supabase = createServiceClient();

  if (!supabase) {
    return { error: "Admin backend is not configured." };
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({ can_publish: canPublish })
    .eq("id", profileId)
    .select("can_publish")
    .single();

  if (error) {
    return { error: error.message };
  }

  if (data?.can_publish !== canPublish) {
    return {
      error:
        "Publishing status did not update. Run supabase/migrations/003_fix_can_publish_trigger.sql in the Supabase SQL editor, then try again.",
    };
  }

  return { error: null };
}

function parseQuizQuestion(row: QuizQuestion): QuizQuestion {
  return {
    ...row,
    options: Array.isArray(row.options) ? row.options : [],
  };
}

export async function listAdminEvents() {
  const supabase = createServiceClient();

  if (!supabase) {
    return [] as CampaignEvent[];
  }

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("status", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("listAdminEvents", error.message);
    return [] as CampaignEvent[];
  }

  return (data ?? []) as CampaignEvent[];
}

export async function createEvent(input: CreateEventInput) {
  const supabase = createServiceClient();

  if (!supabase) {
    return { error: "Admin backend is not configured." };
  }

  const { error } = await supabase.from("events").insert({
    title: input.title.trim(),
    event_date: input.eventDate.trim(),
    location: input.location.trim(),
    description: input.description.trim(),
    status: input.status,
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

export async function deleteEvent(eventId: string) {
  const supabase = createServiceClient();

  if (!supabase) {
    return { error: "Admin backend is not configured." };
  }

  const { error } = await supabase.from("events").delete().eq("id", eventId);

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

export async function deleteAllEvents() {
  const supabase = createServiceClient();

  if (!supabase) {
    return { error: "Admin backend is not configured." };
  }

  const { error } = await supabase
    .from("events")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

export async function listAdminQuizQuestions() {
  const supabase = createServiceClient();

  if (!supabase) {
    return [] as QuizQuestion[];
  }

  const { data, error } = await supabase
    .from("quiz_questions")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("listAdminQuizQuestions", error.message);
    return [] as QuizQuestion[];
  }

  return (data ?? []).map((row) => parseQuizQuestion(row as QuizQuestion));
}

export async function createQuizQuestion(input: CreateQuizQuestionInput) {
  const supabase = createServiceClient();

  if (!supabase) {
    return { error: "Admin backend is not configured." };
  }

  const options = input.options.map((option) => option.trim()).filter(Boolean);

  if (options.length < 2) {
    return { error: "Add at least two answer options." };
  }

  if (!options.includes(input.answer.trim())) {
    return { error: "The correct answer must match one of the options." };
  }

  const { count, error: countError } = await supabase
    .from("quiz_questions")
    .select("*", { count: "exact", head: true });

  if (countError) {
    return { error: countError.message };
  }

  const { error } = await supabase.from("quiz_questions").insert({
    question: input.question.trim(),
    options,
    answer: input.answer.trim(),
    explanation: input.explanation.trim(),
    sort_order: (count ?? 0) + 1,
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

export async function deleteQuizQuestion(questionId: string) {
  const supabase = createServiceClient();

  if (!supabase) {
    return { error: "Admin backend is not configured." };
  }

  const { error } = await supabase
    .from("quiz_questions")
    .delete()
    .eq("id", questionId);

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}
