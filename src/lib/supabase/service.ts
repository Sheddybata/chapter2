import { createClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Profile } from "@/types/articles";

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
