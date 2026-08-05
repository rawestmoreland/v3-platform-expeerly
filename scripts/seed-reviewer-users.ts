/**
 * Seed demo reviewer Auth users + users_analytics_v2 profiles.
 *
 * Requires env:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   SEED_REVIEWER_PASSWORD (optional; default below)
 *
 * Usage: npx tsx scripts/seed-reviewer-users.ts
 *
 * Prerequisite: Phase 1 migration applied (users_analytics_v2 + auth trigger).
 */

import { createClient } from "@supabase/supabase-js";

type SeedUser = {
  email: string;
  firstName: string;
  lastName: string;
  reviewerStatus: "profile_approved" | "onboarding_incomplete";
};

const SEED_USERS: SeedUser[] = [
  {
    email: "sarah.approved@example.com",
    firstName: "Sarah",
    lastName: "M.",
    reviewerStatus: "profile_approved",
  },
  {
    email: "alex.new@example.com",
    firstName: "Alex",
    lastName: "N.",
    reviewerStatus: "onboarding_incomplete",
  },
];

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const password = process.env.SEED_REVIEWER_PASSWORD ?? "ChangeMe-Reviewer-Demo-1!";

  if (!url || !serviceRoleKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  const admin = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  for (const seed of SEED_USERS) {
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email: seed.email,
      password,
      email_confirm: true,
      user_metadata: {
        role: "reviewer",
        first_name: seed.firstName,
        last_name: seed.lastName,
      },
    });

    let userId = created.user?.id;

    if (createError) {
      // Likely already exists — look up by email via listUsers filter is limited; try sign-in path via getUserByEmail if available.
      const listed = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
      const existing = listed.data.users.find((u) => u.email === seed.email);
      if (!existing) {
        console.error(`Failed to create ${seed.email}:`, createError.message);
        continue;
      }
      userId = existing.id;
      console.log(`User exists: ${seed.email} (${userId})`);
    } else {
      console.log(`Created auth user: ${seed.email} (${userId})`);
    }

    if (!userId) continue;

    const { error: upsertError } = await admin.from("users_analytics_v2").upsert(
      {
        auth_user_id: userId,
        email: seed.email,
        first_name: seed.firstName,
        last_name: seed.lastName,
        role: "reviewer",
        reviewer_status: seed.reviewerStatus,
        email_verification_status: "verified",
        auth_method: "email",
      },
      { onConflict: "auth_user_id" },
    );

    if (upsertError) {
      // Trigger may have inserted the row; fall back to update by auth_user_id.
      const { error: updateError } = await admin
        .from("users_analytics_v2")
        .update({
          first_name: seed.firstName,
          last_name: seed.lastName,
          reviewer_status: seed.reviewerStatus,
          email_verification_status: "verified",
          role: "reviewer",
        })
        .eq("auth_user_id", userId);

      if (updateError) {
        console.error(`Failed to upsert profile for ${seed.email}:`, upsertError.message, updateError.message);
        continue;
      }
    }

    console.log(`Profile ready: ${seed.email} → ${seed.reviewerStatus}`);
  }

  console.log("Done. Demo password:", password);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
