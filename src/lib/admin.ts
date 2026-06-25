import { redirect } from "next/navigation";

import { getCurrentProfile } from "@/lib/articles";

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined) {
  if (!email) {
    return false;
  }

  return getAdminEmails().includes(email.trim().toLowerCase());
}

export async function requireAdmin() {
  const { user } = await getCurrentProfile();

  if (!user || !isAdminEmail(user.email)) {
    redirect("/account");
  }

  return user;
}
