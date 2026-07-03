import { createClient as createBrowserClient } from "@supabase/supabase-js";

const AUTH_COOKIE_NAMES = ["sb-access-token", "sb-refresh-token"];

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export function persistAdminAuthSession(accessToken: string, refreshToken: string) {
  if (typeof document === "undefined") return;

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `sb-access-token=${accessToken}; path=/; expires=${expires}; SameSite=Lax`;
  document.cookie = `sb-refresh-token=${refreshToken}; path=/; expires=${expires}; SameSite=Lax`;
}

export function clearAdminAuthSession() {
  if (typeof document === "undefined") return;

  AUTH_COOKIE_NAMES.forEach((name) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  });
}
