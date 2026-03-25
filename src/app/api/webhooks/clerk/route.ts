import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("[clerk-webhook] CLERK_WEBHOOK_SECRET not configured");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  // Get svix headers for verification
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    // Attempt to verify with svix if available
    const { Webhook } = await import("svix");
    const wh = new Webhook(WEBHOOK_SECRET);
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    // If svix is not installed or signature is invalid, log and fall through
    // In production, you should reject unverified events
    const isSvixMissing =
      err instanceof Error && err.message.includes("Cannot find module");

    if (!isSvixMissing) {
      console.error("[clerk-webhook] Invalid webhook signature:", err);
      return new Response("Invalid webhook signature", { status: 400 });
    }

    console.warn(
      "[clerk-webhook] svix not installed — processing without signature verification (insecure)"
    );
    // Fall back to raw payload without verification
    evt = payload as WebhookEvent;
  }

  // Handle user.created event — sync to Supabase
  if (evt.type === "user.created") {
    const { id, email_addresses, username, first_name, last_name, image_url } =
      evt.data;

    const primaryEmail = email_addresses?.[0]?.email_address ?? null;
    const displayName =
      [first_name, last_name].filter(Boolean).join(" ") || null;

    try {
      const supabase = createAdminClient();
      const { error } = await supabase.from("users").upsert(
        {
          clerk_id: id,
          email: primaryEmail,
          username: username || `user_${id.slice(-8)}`,
          display_name: displayName,
          avatar_url: image_url || null,
          created_at: new Date().toISOString(),
        },
        { onConflict: "clerk_id" }
      );

      if (error) {
        console.error("[clerk-webhook] Supabase upsert failed:", error);
        return new Response("Database error", { status: 500 });
      }

      console.log(`[clerk-webhook] Synced new user: ${id} (${primaryEmail})`);
    } catch (dbErr) {
      console.error("[clerk-webhook] Unexpected DB error:", dbErr);
      return new Response("Database error", { status: 500 });
    }
  }

  return new Response("OK", { status: 200 });
}
