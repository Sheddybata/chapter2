"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin";
import {
  createEvent,
  deleteAllEvents,
  deleteEvent,
} from "@/lib/supabase/service";
import type { CreateEventInput } from "@/types/content";

export async function addEvent(input: CreateEventInput) {
  await requireAdmin();

  const result = await createEvent(input);

  if (result.error) {
    return { error: result.error };
  }

  revalidatePath("/events");
  revalidatePath("/admin/events");

  return { error: null };
}

export async function removeEvent(eventId: string) {
  await requireAdmin();

  const result = await deleteEvent(eventId);

  if (result.error) {
    return { error: result.error };
  }

  revalidatePath("/events");
  revalidatePath("/admin/events");

  return { error: null };
}

export async function removeAllEvents() {
  await requireAdmin();

  const result = await deleteAllEvents();

  if (result.error) {
    return { error: result.error };
  }

  revalidatePath("/events");
  revalidatePath("/admin/events");

  return { error: null };
}
