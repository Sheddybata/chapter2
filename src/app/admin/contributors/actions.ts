"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin";
import { setContributorPublishing } from "@/lib/supabase/service";

export async function approveContributor(profileId: string) {
  await requireAdmin();

  const result = await setContributorPublishing(profileId, true);

  if (result.error) {
    return { error: result.error };
  }

  revalidatePath("/admin/contributors");
  revalidatePath("/account");

  return { error: null };
}

export async function revokeContributor(profileId: string) {
  await requireAdmin();

  const result = await setContributorPublishing(profileId, false);

  if (result.error) {
    return { error: result.error };
  }

  revalidatePath("/admin/contributors");
  revalidatePath("/account");

  return { error: null };
}
